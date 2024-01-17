import PostCard from '@components/Post/PostCard';
import categoryStore from '@store/CategoryStore';
import { PostType } from '@store/PostStore';
import savedStore from '@store/SavedStore';
import { observer } from 'mobx-react-lite';

type Props = { post: PostType; onPressPost: () => void };

const Post = ({ post, onPressPost }: Props) => (
  <PostCard
    image={post.image}
    title={post.title}
    onPressPost={onPressPost}
    isSaved={savedStore.isSavedPost(post.id)}
    onPressSave={() => savedStore.addPost(post)}
    category={post.category || categoryStore.categoryName(post.categories)}
  />
);

export default observer(Post);
