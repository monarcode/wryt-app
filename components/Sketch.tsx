import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '~/theme';
import Entypo from '@expo/vector-icons/Entypo';

export const Sketch: React.FC = () => {
  const [showOption, setShowOption] = useState(false);

  const handleToggle = () => {
    setShowOption((option) => !option);
  };

  const handleEditTool = () => {
    setShowOption((option) => !option);
  };

  const handleDelete = () => {
    // deleteTool(getTool.id);
    // setToastMessage('Tool deleted successfully!');
    // setToastType('success');
    // setToastVisible(true);
    // setShowOption(false);
    // setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.cardHead}>
        <View />
        <TouchableOpacity onPress={handleToggle}>
          <Entypo name="dots-three-vertical" size={15} color="#47474F" />
        </TouchableOpacity>
      </View>
      {showOption && (
        <View style={styles.selectCard}>
          <TouchableOpacity onPress={handleEditTool}>
            <Text style={styles.selectText}>Edit Sketch</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.selectText}>Delete Sketch</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text style={styles.heading}>My frist drawing</Text>
        <Text style={styles.text}>2 days ago</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 264,
    width: '44%',
    margin: '3%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    position: 'relative',
  },
  heading: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: 14
  },
  text: {
    fontFamily: theme.fontFamily.regular,
    fontSize: 12,
    marginTop: 5
  },
  selectCard: {
    borderRadius: 8,
    borderWidth: 0.5,
    width: 136,
    height: 102,
    borderColor: '#DCDCDE',
    padding: 16,
    gap: 16,
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 5,
    backgroundColor: '#fff',
  },
  selectText: {
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    color: '#47474F',
    height: 25,
  },
  cardHead: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
