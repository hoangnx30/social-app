import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { uploadContent, deleteStatus } from '../services/service';

interface Props {
  children?: any;
  isVisible?: boolean;
  showModal?: () => void;
  closeModal?: any;
}

const ModalCustom = (props: Props) => {
  const uidPost = useSelector((state) => state.userState.uidPost);
  const content = useSelector((state) => state.userState.content);
  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={props.isVisible}
        style={{ margin: 0 }}
        hasBackdrop={true}
        backdropColor="#000000"
        backdropOpacity={0.3}
        onBackdropPress={props.closeModal}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight> */}
            <View style={{ marginBottom: 10 }}>
              <TouchableNativeFeedback
                onPress={() => {
                  props.closeModal();
                }}
              >
                <View style={styles.wrapItem}>
                  <View>
                    <MaterialIcons name="edit" size={30} />
                  </View>
                  <View style={styles.wrapText}>
                    <Text style={styles.textStyle}>Edit Status</Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>

            <TouchableNativeFeedback
              onPress={() => {
                props.closeModal();
                deleteStatus(uidPost);
              }}
            >
              <View style={styles.wrapItem}>
                <View>
                  <MaterialIcons name="delete" size={30} />
                </View>
                <View style={styles.wrapText}>
                  <Text style={styles.textStyle}>Delete Status</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>

      {/* <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight> */}
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
  },
  centeredView1: {
    width: '100%',
    height: '100%',
  },
  wrapItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 7,
    alignItems: 'center',
  },
  modalView: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    width: '100%',
    borderTopEndRadius: 20,
    paddingTop: 20,
    borderTopStartRadius: 20,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  wrapText: {
    marginLeft: 20,
  },
});

export default ModalCustom;
