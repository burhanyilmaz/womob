import { blogHeaderBg } from '@components/Images';
import { Image, StyleSheet } from 'react-native';

const BlogTabHeaderBackgroundImage = () => (
  <Image
    resizeMode="cover"
    className="bg-zinc-50"
    source={{ uri: blogHeaderBg }}
    style={StyleSheet.absoluteFill}
  />
);

export default BlogTabHeaderBackgroundImage;
