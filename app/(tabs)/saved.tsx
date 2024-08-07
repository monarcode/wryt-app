import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SortIcon from '~/assets/icons/sort-icon.svg';
import { Text, View } from '~/components/shared';
import useSketchPadStore from '~/store/store';
import { theme } from '~/theme';

interface Sketch {
  fileName: string;
  timeStamp: string;
  imageUri: string;
}

const SavedSketches = () => {
  const [sketches, setSketches] = useState([]);
  const getAllSavedDrawings = useSketchPadStore((state) => state.getAllSavedDrawings);

  const refreshTrigger = useSketchPadStore((state) => state.refreshTrigger);

  useEffect(() => {
    const loadSavedSketches = async () => {
      const drawings = await getAllSavedDrawings();
      setSketches(drawings);
    };

    loadSavedSketches();
  }, [refreshTrigger]);

  const renderSketch = ({ item }: { item: Sketch }) => (
    <View>
      <Image source={{ uri: item.imageUri }} />
      <Text>{item.fileName}</Text>
      <Text>{new Date(item.timeStamp).toLocaleDateString()}</Text>
    </View>
  );
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Sketches</Text>
        <Pressable style={styles.sort}>
          <SortIcon width={24} height={24} />
        </Pressable>
      </View>
      <FlatList
        data={sketches}
        renderItem={renderSketch}
        keyExtractor={(item) => item.timeStamp}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: theme.fontFamily.semiBold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  sort: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 50,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sketchContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  sketchTitle: {
    fontSize: 18,
    fontFamily: theme.fontFamily.medium,
  },
  sketchTimestamp: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  sketchPreview: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default SavedSketches;
