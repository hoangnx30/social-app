import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Avatar } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButtonMI, CustomHeaderButtonMCI } from './HeaderButton';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mainContent: { marginVertical: 10 },
  bottomContent: { flexDirection: 'row' },
  leftContainer: { padding: 5 },
  rightContainer: { flexShrink: 1, padding: 5 },
  action: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  numberOfAction: { fontSize: 18, marginLeft: 4 },
  username: { fontSize: 18, fontWeight: 'bold' },
});

const Post: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Avatar.Image source={require('../assets/avatar.png')} />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.topContent}>
          <View>
            <Text style={styles.username}>username</Text>
            <Text>Mar 14 20: 20</Text>
          </View>
          <View style={{}}>
            <MaterialIcons name="keyboard-arrow-down" size={32} />
          </View>
        </View>

        <View>
          <View style={styles.mainContent}>
            <Text style={{ flexWrap: 'wrap' }}>
              Lorem ipsum dolor sit ametLorem ipsum dolor sit ameLorlor sit ameLorem ipsum dolor sit em ipsum dolor sit
              ame,t
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.bottomContent}>
            <View style={styles.action}>
              <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
                <Item title="heart" iconName="heart" onPress={() => {}}></Item>
              </HeaderButtons>
              <Text style={styles.numberOfAction}>1</Text>
            </View>

            <View style={styles.action}>
              <HeaderButtons HeaderButtonComponent={CustomHeaderButtonMCI}>
                <Item title="comment" iconName="comment" onPress={() => {}}></Item>
              </HeaderButtons>
              <Text style={styles.numberOfAction}>32</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;
