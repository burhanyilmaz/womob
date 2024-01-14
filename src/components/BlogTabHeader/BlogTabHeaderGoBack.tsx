import { StackActions, useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable } from 'react-native';

const BlogTabHeaderGoBack = () => {
  const { dispatch } = useNavigation();

  if (!__DEV__) {
    return null;
  }

  return (
    <Pressable className="ml-5" onPress={() => dispatch(StackActions.popToTop)}>
      <ArrowLeft className="text-zinc-800" />
    </Pressable>
  );
};

export default BlogTabHeaderGoBack;
