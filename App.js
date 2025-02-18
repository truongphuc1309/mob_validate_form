import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const PhoneNumberValidation = ({ phoneNumber, setPhoneNumber, validatePhoneNumber, errorMessage, isPhoneNumberValid }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => {
          setPhoneNumber(text);
          validatePhoneNumber(text);
        }}
      />
      <TouchableOpacity
        style={[styles.btn, !isPhoneNumberValid && styles.btnDisabled]}
        onPress={() => validatePhoneNumber(phoneNumber)}
        disabled={!isPhoneNumberValid}
      >
        <Text style={styles.btnText}>Tiếp tục</Text>
      </TouchableOpacity>
      {errorMessage ? <Text style={[styles.errorText, isPhoneNumberValid && styles.successText]}>{errorMessage}</Text> : null}
    </View>
  );
};

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

    if (phoneRegex.test(phone)) {
      setErrorMessage('Số điện thoại hợp lệ!');
      setIsPhoneNumberValid(true);
    } else {
      setErrorMessage('Số điện thoại không hợp lệ!');
      setIsPhoneNumberValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Đăng nhập</Text>
      </View>
      <Text style={styles.text1}>Nhập số điện thoại</Text>
      <Text style={styles.text}>Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro</Text>
      <PhoneNumberValidation
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        validatePhoneNumber={validatePhoneNumber}
        errorMessage={errorMessage}
        isPhoneNumberValid={isPhoneNumberValid}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    height: 50,
    marginBottom: 50,
    borderBottomWidth: 2,
    borderColor: '#efefef',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  text1: {
    fontSize: 22,
    paddingBottom: 15,
  },
  text: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomColor: 'gray',
    paddingLeft: 8,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#629ae3',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#d3d3d3',
  },
  btnText: {
    color: '#eee',
    fontSize: 18,
  },
  errorText: {
    color: '#e74c3c',
    marginTop: 10,
  },
  successText: {
    color: '#2ecc71',
  },
});