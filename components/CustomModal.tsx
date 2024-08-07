import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ColorPicker, { Panel1, Preview } from 'reanimated-color-picker';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  recentlyUsedColors: string[];
  onColorSelect: (color: string) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  recentlyUsedColors,
  onColorSelect,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader} />

          <Text style={styles.title}>Pick A Color</Text>
          <Text style={styles.subtitle}>Select color to draw on your canvas</Text>

          <ColorPicker
            style={styles.colorPicker}
            value="#FF5733"
            onComplete={({ hex }) => onColorSelect(hex)}>
            <Preview />
            <Panel1 />
          </ColorPicker>

          <Text style={styles.recentlyUsedText}>Recently Used</Text>
          <View style={styles.recentColors}>
            {recentlyUsedColors.map((color, index) => (
              <View key={index} style={[styles.recentColor, { backgroundColor: color }]} />
            ))}
          </View>

          <TouchableOpacity onPress={onClose} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save and Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 350,
    paddingVertical: 80,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    width: 50,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6e6e6e',
    marginBottom: 20,
  },
  colorPicker: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  recentlyUsedText: {
    fontSize: 16,
    color: '#6e6e6e',
    marginBottom: 10,
  },
  recentColors: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },
  recentColor: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#2D2966',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomModal;
