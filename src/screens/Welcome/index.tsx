import Button from '@components/core/Button';
import Input from '@components/core/Input';
import { text } from '@theme/text';
import { useState } from 'react';
import { Text, View } from 'react-native';

const WelcomeScreen = () => {
  const [wordpressSite, setWordpressSiteUrl] = useState('https://blog.ted.com/');

  return (
    <View className="flex-1 items-center justify-center px-5 bg-white">
      <View className="mb-10 items-center">
        <View className="flex-row">
          <Text className="text-zinc-700 text-[28px] font-Bold">Wo</Text>
          <View className="bg-zinc-900 rounded-md">
            <Text className="text-white text-[28px] font-Bold mx-2">Mob</Text>
          </View>
        </View>
        <Text className={text({ type: 'subtitle', class: 'opacity-60 text-zinc-900 mt-1' })}>
          Wordpress to Mobile App
        </Text>
      </View>
      <View className="w-full">
        <Input
          value={wordpressSite}
          containerClass="w-full mb-4"
          onChangeText={setWordpressSiteUrl}
          placeholder="Type your wordpress site link"
        />
        <Button title="Convert Wordpress into Mobile" />
      </View>
    </View>
  );
};

export default WelcomeScreen;
