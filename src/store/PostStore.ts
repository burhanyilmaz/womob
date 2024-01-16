import { api } from '@services/Api';
import { removeHtmlAndDecimalEntities } from '@utils/helpers';
import { ApiPostType } from '@utils/types/BlogTypes';
import { Instance, flow, t } from 'mobx-state-tree';

export const Post = t
  .model('Post', {
    title: t.string,
    id: t.identifier,
    content: t.string,
    mediaUrl: t.string,
    image: t.maybe(t.string),
    category: t.maybe(t.string),
    headerImage: t.maybe(t.string),
    imageLoaded: t.maybe(t.boolean),
  })
  .actions(self => ({
    fetchMedia: flow(function* () {
      if (!self.mediaUrl) {
        return;
      }

      const media = yield api.getMediaByUrl(self.mediaUrl);

      self.image = media?.media_details?.sizes?.medium?.source_url || media?.guid?.rendered;
      self.headerImage = media?.guid?.rendered;
      self.imageLoaded = true;
    }),

    fetchCategory: flow(function* () {
      if (!self.id) {
        self.category = 'Category';

        return;
      }

      const category = yield api.getCategories(self.id);
      self.category = removeHtmlAndDecimalEntities(category[0]?.name) || 'Category';
    }),

    async afterCreate() {
      this.fetchMedia();
      this.fetchCategory();
    },
  }));

const PostStore = t
  .model('PostStore', {
    url: t.string,
    page: t.number,
    posts: t.map(Post),
    loading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get fetchPosts() {
      return Array.from(self.posts.values());
    },
    getSelectedPost(id: string) {
      return self.posts.get(id);
    },
  }))
  .actions(self => ({
    setUrl: (url: string) => {
      if (!url) {
        return;
      }

      api.createApiInstance(url);
      self.url = url;
    },

    addPost: (post: ApiPostType) => {
      self.posts.set(
        post.id,
        Post.create({
          id: post.id.toString(),
          content: post.content.rendered,
          mediaUrl: post?._links?.['wp:featuredmedia']?.[0]?.href || '',
          title: removeHtmlAndDecimalEntities(post?.title?.rendered || ''),
          category: removeHtmlAndDecimalEntities(post?.primary_category?.name || ''),
        }),
      );
    },

    setLoading(loading: boolean) {
      self.loading = loading;
    },

    async getPosts() {
      if (!self.url) {
        return;
      }
      this.setLoading(true);
      try {
        const posts = await api.getPost(self.page);

        if (posts?.length > 0) {
          posts.forEach(this.addPost);
        }

        this.setLoading(false);

        return posts;
      } catch {
        this.setLoading(false);

        return [];
      }
    },

    afterCreate() {
      api.createApiInstance(self.url);
    },

    increasePage() {
      self.page = self.page + 1;
      this.getPosts();
    },

    clearAll() {
      self.posts.clear();
    },
  }));

const postStore = PostStore.create({
  page: 1,
  url: 'https://techcrunch.com/',
});

export default postStore;

export type PostType = Instance<typeof Post>;
