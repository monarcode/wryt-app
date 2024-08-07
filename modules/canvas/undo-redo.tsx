import { TouchableOpacity, StyleSheet } from 'react-native';

import RedoIcon from '~/assets/icons/redo-icon.svg';
import UndoIcon from '~/assets/icons/undo-icon.svg';
import { View } from '~/components/shared';
import useSketchPadStore from '~/store/store';
import { theme } from '~/theme';

const UndoRedo = () => {
  const { undo, redo, redoStack } = useSketchPadStore((store) => store);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={undo} style={styles.action}>
        <UndoIcon />
      </TouchableOpacity>
      <TouchableOpacity disabled={redoStack.length === 0} onPress={redo} style={styles.action}>
        <RedoIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: theme.colors.light,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 50,
    flexDirection: 'row',
    gap: 10,
  },
  action: {},
});

export default UndoRedo;
