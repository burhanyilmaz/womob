import { api } from '@services/Api';
import { removeHtmlAndDecimalEntities } from '@utils/helpers';
import { ApiPostType } from '@utils/types/BlogTypes';
import { Instance, detach, t } from 'mobx-state-tree';

import postStore, { Post } from './PostStore';

const SearchStore = t
  .model('SearchStore', {
    term: t.string,
    results: t.map(Post),
    loading: t.optional(t.boolean, false),
  })
  .views(self => ({
    get listResult() {
      return Array.from(self.results.values());
    },
  }))
  .actions(self => ({
    addPost: (post: ApiPostType) => {
      self.results.set(
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

    setTerm(term: string) {
      self.term = term;
    },

    setLoading(loading: boolean) {
      self.loading = loading;
    },

    clearResult() {
      detach(self.results);
    },

    async searchPost() {
      if (!postStore.url) {
        return;
      }

      this.setLoading(true);
      try {
        const posts = await api.searchPost(self.term);
        this.clearResult();
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

    clearAll() {
      self.term = '';
      self.loading = false;
      self.results.clear();
    },
  }));

const searchStore = SearchStore.create({
  term: '',
});

export default searchStore;

export type PostType = Instance<typeof Post>;
