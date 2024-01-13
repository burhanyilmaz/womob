import { text } from '@theme/text';
import { Text } from 'react-native';

type Props = { title: string };

const BlogTabHeaderTitle = ({ title }: Props) => (
  <Text className={text({ type: 'title4', class: 'text-zinc-800 self-center' })}>{title}</Text>
);

export default BlogTabHeaderTitle;
