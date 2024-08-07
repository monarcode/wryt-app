import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SortIcon from '~/assets/icons/sort-icon.svg';
import { Text, View } from '~/components/shared';
import { Sketch } from '~/components/Sketch';
import { theme } from '~/theme';

const SavedSketches = () => {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: theme.colors.light }}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Sketches</Text>

        <Pressable style={styles.sort}>
          <SortIcon width={24} height={24} />
        </Pressable>
      </View>

      <View style={styles.container}>
        {Array(3).fill(1).map((sketch, i) => (
          <Sketch key={i} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: '3%',
    marginTop: 10
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fontFamily.semiBold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20
  },
  sort: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 50,
  },
});

export default SavedSketches;
