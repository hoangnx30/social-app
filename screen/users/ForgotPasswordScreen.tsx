import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import { useState } from 'react';
import { AuthNavigatorProps } from '../../navigation/types';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    marginTop: 30,
    marginBottom:20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#000',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
  inputmail:{
    borderWidth:1,
    paddingBottom: 7,
    paddingTop: 7,
    paddingLeft: 15,
    width:"70%"
  },
  textmain:{
    marginBottom:30,
    paddingLeft:20, 
    paddingRight:20
  }
});

const ForgotPasswordScreen =  ({ navigation }: AuthNavigatorProps<'ForgotPassword'>)=> {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.screen}>
      <Text style={styles.textmain}>Bạn quên mật khẩu đăng nhập? Xin hãy nhập địa chỉ UETMail ở đây. Chúng tôi sẽ gửi mật khẩu mới cho bạn qua UETMail.</Text>
      <TextInput style={styles.inputmail}
        onChangeText={(email) => setEmail(email)}
        placeholder="Nhập UETMail"/>
      <TouchableHighlight style={styles.submit} underlayColor="#fff">
        <Text style={styles.submitText}>Gửi yêu cầu</Text>
      </TouchableHighlight>
      <Text>Nhấn <Text style={{fontWeight:"bold"}}  onPress={() => navigation.navigate('SignIn')}>VÀO ĐÂY</Text> để quay lại trang Đăng nhập</Text>
    </View>
  );
};

export default ForgotPasswordScreen;
