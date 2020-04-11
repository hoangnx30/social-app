import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

interface Props {
  children?: ReactNode;
  buttonRef: any;
}

const BottomSheet: React.FC<Props> = ({ buttonRef, children }) => {
  return (
    <View style={styles.screen}>
      <RBSheet
        ref={buttonRef}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        {children}
      </RBSheet>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
