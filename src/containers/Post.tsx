import PostCard from '@components/Post/PostCard';
import { PostType } from '@store/PostStore';
import { observer } from 'mobx-react-lite';

const Post = ({ post }: { post: PostType }) => (
  <PostCard
    image={post.image}
    title={post.title}
    onPressPost={() => null}
    category={post.category}
  />
);

export default observer(Post);
