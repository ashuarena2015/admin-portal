/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FC, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_URL } from "@env";
import AppText from '../Forms/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import InputText from '../Forms/InputText';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome5';

interface PageProps {
  navigation: any;
}

const Login:FC<PageProps> = ({ navigation }) => {

  const [isEmailScreen, setIsEmailScreen] = useState(true);
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [isPasswordScreen, setIsPasswordScreen] = useState(false);

  const [formInput, setFormInput] = useState({
      email: '',
      password: '',
      otp: ''
  });

  const handlChange = (name: string, value: string) => {
      setFormInput((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleCreate = async () => {
    const response = await dispatch({
      type: 'apiRequest',
      payload: {
        url: `${API_URL}/account/create`,
        method: 'POST',
        onError: 'GLOBAL_MESSAGE',
        dispatchType: 'accountCreation',
        body: {
          userInfo: {
            email: formInput?.email,
            password: formInput?.password,
          }
        }
      },
    }) as unknown as { isLogin: boolean, isOtpSent: boolean, isVerified: boolean };
    if(response?.isOtpSent) {
      setIsOtpScreen(true);
      setIsEmailScreen(false);
    }
    if(response?.isVerified) {
      setIsPasswordScreen(true);
      setIsEmailScreen(false);
    }
  }
  const handleVerify = async () => {
    const response = await dispatch({
      type: 'apiRequest',
      payload: {
        url: `${API_URL}/account/verify`,
        method: 'POST',
        onError: 'GLOBAL_MESSAGE',
        dispatchType: 'accountCreation',
        body: {
          otp: formInput?.otp,
          email: formInput?.email,
          password: formInput?.password
        }
      },
    }) as unknown as { isLogin: boolean, isVerified: boolean };
    console.log({response});
    if(response?.isVerified) {
      navigation.navigate('Profile');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView style={styles.mainWrpper} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <View style={styles.loginContainer}>
            <AppText style={{ fontSize: 32, lineHeight: 36 }}>Sign in or create an account.</AppText>
              {isEmailScreen ? <View>
                  <InputText
                    placeholderText="Enter your email"
                    handleChange={handlChange}
                    label={'Email'}
                    name={'email'}
                    style={{ marginBottom: 16 }}
                  />
                    <TouchableOpacity
                      style={styles.primaryBtn}
                      onPress={handleCreate}
                      activeOpacity={0.8}
                    >
                      <AppText style={styles.buttonText}>Continue</AppText>
                    </TouchableOpacity>
                </View> : null }
              {isOtpScreen ? <View>
                  <InputText
                    placeholderText="Enter your OTP"
                    handleChange={handlChange}
                    label={'OTP'}
                    name={'otp'}
                    style={{ marginBottom: 16 }}
                  />
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={handleVerify}
                    activeOpacity={0.8}
                  >
                    <AppText style={styles.buttonText}>Verify your email</AppText>
                  </TouchableOpacity>
                </View> : null}
              {isPasswordScreen ? <View>
                <InputText
                  placeholderText="Enter your password"
                  handleChange={handlChange}
                  label={'Password'}
                  name={'password'}
                  style={{ marginBottom: 16 }}
                />
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={handleVerify}
                    activeOpacity={0.8}
                  >
                    <AppText style={styles.buttonText}>Continue</AppText>
                  </TouchableOpacity>
              </View> : null}
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={handleCreate}
              activeOpacity={0.8}
            >
              <AppText style={styles.buttonText}>Continue with Google</AppText>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Icon name="fingerprint" size={70} color="#27548A" />
            </View>
          </View>
          <AppText style={{ color: '#fff' }}>By continuing you agree to Terms of Services and Privacy Policy</AppText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainWrpper: {
    height: '100%',
    width: '100%',
    padding: 32
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 58,
  },
  heading1: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 20,
  },
  loginContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 32,
    gap: 16
  },
  formContainer: {
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: '#A4B465',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    color: '#fff',
  },
  secondaryBtn: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#cacaca',
    borderWidth: 1,
    color: '#999'
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Login;
