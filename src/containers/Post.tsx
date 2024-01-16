import PostCard from '@components/Post/PostCard';
import { PostType } from '@store/PostStore';
import savedStore from '@store/SavedStore';
import { observer } from 'mobx-react-lite';

const Post = ({ post }: { post: PostType }) => (
  <PostCard
    image={post.image}
    title={post.title}
    category={post.category}
    onPressPost={() => null}
    isSaved={savedStore.isSavedPost(post.id)}
    onPressSave={() => savedStore.addPost(post)}
  />
);

export default observer(Post);
