import PostCard from '@components/Post/PostCard';
import { PostType } from '@store/PostStore';
import savedStore from '@store/SavedStore';
import { observer } from 'mobx-react-lite';

type Props = { post: PostType; onPressPost: () => void };

const Post = ({ post, onPressPost }: Props) => (
  <PostCard
    image={post.image}
    title={post.title}
    category={post.category}
    onPressPost={onPressPost}
    isSaved={savedStore.isSavedPost(post.id)}
    onPressSave={() => savedStore.addPost(post)}
  />
);

export default observer(Post);
