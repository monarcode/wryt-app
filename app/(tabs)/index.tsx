import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SketchCanvas } from '~/components/SketchCanvas';
import SaveErase from '~/modules/canvas/save-erase';
import UndoRedo from '~/modules/canvas/undo-redo';

export default function Home() {
  return (
    <>
      <SafeAreaView edges={['top']} style={{ flex: 1, paddingHorizontal: 18 }}>
        <View style={styles.container}>
          <SaveErase />
          <UndoRedo />
          <SketchCanvas containerStyle={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
  },
});
