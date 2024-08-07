import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SketchCanvas } from '~/components/SketchCanvas';
import SaveDrawingModal from '~/components/modals/SaveDrawingModal';
import ColorPicker from '~/modules/canvas/color-picker';
import SaveErase from '~/modules/canvas/save-erase';
import StrokePicker from '~/modules/canvas/stroke-picker';
import UndoRedo from '~/modules/canvas/undo-redo';
import { theme } from '~/theme';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };
  return (
    <>
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, paddingHorizontal: 18, backgroundColor: theme.colors.light }}>
        <View style={styles.container}>
          <SketchCanvas containerStyle={{ flex: 1 }} />
          <SaveErase handleSave={handleModalOpenChange} />
          <UndoRedo />
          <ColorPicker />
          <StrokePicker />
        </View>
        <SaveDrawingModal isOpen={isModalOpen} onOpenChange={handleModalOpenChange} />
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
