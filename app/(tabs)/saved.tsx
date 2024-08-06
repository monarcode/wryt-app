import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, View } from '~/components/shared';

const SavedSketches = () => {
  return (
    <SafeAreaView edges={['top']}>
      <View style={{ paddingHorizontal: 24 }}>
        <Text>Saved Sketches</Text>
      </View>
    </SafeAreaView>
  );
};
export default SavedSketches;
