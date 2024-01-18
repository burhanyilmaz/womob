import { text } from '@theme/text';
import { ExampleWPWebsites } from '@utils/data';
import { ChevronRight } from 'lucide-react-native';
import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from './core/Button';

type Props = {
  visible: boolean;
  onClose: () => void;
  onPressExampleWebsite: (url: string) => void;
};

const ExampleWpSites = ({ visible, onClose, onPressExampleWebsite }: Props) => (
  <Modal visible={visible} transparent animationType="none">
    <View className="flex-1 justify-end items-center" style={styles.overlay}>
      <SafeAreaView className="w-full bg-zinc-100 rounded-t-xl ">
        <FlatList
          data={ExampleWPWebsites}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onPressExampleWebsite(item.url)}
              className="mx-5 py-2 flex-row items-center justify-between border-b-0.5 border-zinc-500">
              <View className="flex-row items-center">
                <Image
                  source={{
                    uri: item.image,
                  }}
                  resizeMode="contain"
                  className="h-16 w-16 mr-4"
                />
                <Text className={text({ type: 'title4' })}>{item.name}</Text>
              </View>
              <ChevronRight className="text-zinc-700" />
            </TouchableOpacity>
          )}
        />
        <Text className={text({ type: 'subhead', isCenter: true, class: 'mt-4' })}>
          Press the example website and see the result.
        </Text>
        <View className=" w-full p-5 pt-4">
          <Button title="Close" onPress={onClose} />
        </View>
      </SafeAreaView>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { backgroundColor: 'rgba(0,0,0,0.6)' },
});

export default ExampleWpSites;
