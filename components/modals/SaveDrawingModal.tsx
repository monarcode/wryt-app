import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { theme } from '~/theme';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const SaveDrawingModal = ({ isVisible, onClose }: Props) => {
  const [canvasName, setCanvasName] = useState('');

  const handleSave = () => {
    // Handle save action
    console.log('Canvas Name:', canvasName);
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Save Drawing</Text>
        <Text style={styles.subtitle}>Enter a name for this canvas</Text>
        <TextInput style={styles.input} value={canvasName} onChangeText={setCanvasName} />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save and Continue</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: theme.fontFamily.semiBold,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: theme.fontFamily.medium,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: theme.fontFamily.medium,
  },
});

export default SaveDrawingModal;
