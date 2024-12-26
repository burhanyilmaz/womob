import { api } from '@services/Api';
import { removeHtmlAndDecimalEntities } from '@utils/helpers';
import { ApiPostType } from '@utils/types/BlogTypes';
import { when } from 'mobx';
import { Instance, flow, t } from 'mobx-state-tree';

export const Post = t
  .model('Post', {
    link: t.string,
    title: t.string,
    id: t.identifier,
    content: t.string,
    mediaUrl: t.string,
    image: t.maybe(t.string),
    category: t.maybe(t.string),
    categories: t.array(t.string),
    headerImage: t.maybe(t.string),
    imageLoaded: t.maybe(t.boolean),
  })
  .actions(self => ({
    fetchMedia: flow(function* () {
      if (!self.mediaUrl) {
        return;
      }

      const media = yield api.getMediaByUrl(self.mediaUrl);
      const mediaSizes = media?.media_details;
      const renderedMedia = media?.guid?.rendered;

      self.image = mediaSizes?.medium?.source_url || renderedMedia;
      self.headerImage = mediaSizes?.large?.source_url || renderedMedia;
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
    },
  }));

const PostStore = t
  .model('PostStore', {
    url: t.string,
    page: t.number,
    posts: t.map(Post),
    loading: t.optional(t.boolean, false),
    pullToRefresh: t.optional(t.boolean, false),
  })
  .views(self => ({
    get listingPosts() {
      return Array.from(self.posts.values()).slice(4, self.posts.size);
    },

    getSelectedPost(id: string) {
      return self.posts.get(id);
    },

    get sliderPosts() {
      return Array.from(self.posts.values()).slice(0, 4);
    },
  }))
  .actions(self => ({
    setUrl: (url: string) => {
      api.createApiInstance(url);
      self.url = url;
    },

    addPost: (post: ApiPostType) => {
      self.posts.set(
        post.id,
        Post.create({
          link: post.link,
          id: post.id.toString(),
          content: post.content.rendered,
          mediaUrl: post?._links?.['wp:featuredmedia']?.[0]?.href || '',
          title: removeHtmlAndDecimalEntities(post?.title?.rendered || ''),
          category: removeHtmlAndDecimalEntities(post?.primary_category?.name || ''),
          categories: (post.categories || post.section)
            ?.slice(0, 2)
            .map(category => category.toString()),
        }),
      );
    },

    setLoading(loading: boolean) {
      self.loading = loading;
    },

    setPullToRefresh(pullToRefresh: boolean) {
      self.pullToRefresh = pullToRefresh;
    },

    async getPosts() {
      if (!self.url) {
        return;
      }
      this.setLoading(true);

      try {
        if (self.pullToRefresh) {
          self.page = 1;
        }
        const posts = await api.getPost(self.page);

        if (self.pullToRefresh) {
          this.clearAll();

          setTimeout(() => {
            this.setPullToRefresh(false);
          }, 1000);
        }

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
  url: '',
});

export default postStore;

export type PostType = Instance<typeof Post>;
