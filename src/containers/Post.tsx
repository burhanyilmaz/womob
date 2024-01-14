import PostCard from '@components/Post/PostCard';
import { PostType } from '@store/PostStore';
import { observer } from 'mobx-react-lite';

const Post = ({ post }: { post: PostType }) => (
  <PostCard
    image={post.image}
    title={post.title}
    onPressSave={() => null}
    category={post.category}
    onPressPost={() => null}
  />
);

export default observer(Post);
