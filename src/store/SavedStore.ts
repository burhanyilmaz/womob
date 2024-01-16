import { destroy, t } from 'mobx-state-tree';

import { Post, PostType } from './PostStore';

const SavedStore = t
  .model('SavedStore', {
    saved: t.map(Post),
  })
  .views(self => ({
    get listResult() {
      return Array.from(self.saved.values());
    },
  }))
  .views(self => ({
    isSavedPost(postId: string) {
      if (!postId) {
        return false;
      }

      return !!self.saved.get(postId);
    },
  }))
  .actions(self => ({
    addPost: (post: PostType) => {
      const savedPost = self.saved.get(post.id);
      if (savedPost) {
        destroy(savedPost);

        return;
      }
      self.saved.set(
        post.id,
        Post.create({
          id: post.id,
          mediaUrl: post.mediaUrl,
          title: post.title,
          category: post.category,
          image: post.image,
          imageLoaded: post.imageLoaded,
        }),
      );
    },

    clearAll() {
      self.saved.clear();
    },
  }));

const savedStore = SavedStore.create({});

export default savedStore;
