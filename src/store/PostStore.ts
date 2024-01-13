import { api } from '@services/Api';
import { removeHtmlAndDecimalEntities } from '@utils/helpers';
import { ApiPostType } from '@utils/types/BlogTypes';
import { Instance, t } from 'mobx-state-tree';

const Post = t
  .model({
    id: t.identifier,
    title: t.string,
    category: t.string,
    mediaUrl: t.string,
    image: t.optional(t.string, ''),
    imageLoaded: t.optional(t.boolean, false),
  })
  .actions(self => ({
    setCategory(category: string) {
      self.category = category;
    },

    setMedia(url: string) {
      self.image = url;
      self.imageLoaded = true;
    },
    async afterCreate() {
      Promise.all([
        api.getCategories(self.id).then(category => {
          this.setCategory(removeHtmlAndDecimalEntities(category[0]?.name) || 'Category');
        }),
        api.getMediaByUrl(self.mediaUrl).then(media => {
          this.setMedia(media?.media_details?.sizes?.medium?.source_url || media?.guid?.rendered);
        }),
      ]);
    },
  }));

const PostStore = t
  .model({
    url: t.string,
    page: t.number,
    posts: t.map(Post),
    loading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get fetchPosts() {
      return Array.from(self.posts.values());
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
          mediaUrl: post._links['wp:featuredmedia'][0].href || '',
          title: removeHtmlAndDecimalEntities(post.title.rendered),
          category: removeHtmlAndDecimalEntities(post.primary_category?.name || ''),
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
      const posts = await api.getPost(self.page);

      if (posts?.length > 0) {
        posts.forEach(this.addPost);
      }

      this.setLoading(false);
    },

    async getMedia(id: number, link: string) {
      const media = await (await fetch(link)).json();
      const post = self.posts.get(id);
      post?.setMedia(media.media_details?.sizes?.medium?.source_url || media.guid.rendered);
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
  url: 'https://techcrunch.com/',
  page: 0,
});

export default postStore;

export type PostType = Instance<typeof Post>;
