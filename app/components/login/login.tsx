/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FC, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { API_URL } from "@env";
import AppText from '../Forms/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import InputText from '../Forms/InputText';

import * as LocalAuthentication from 'expo-local-authentication';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome5';

interface PageProps {
  navigation: any;
}

const Login:FC<PageProps> = ({ navigation }) => {

  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isEmailScreen, setIsEmailScreen] = useState(true);
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [isPasswordScreen, setIsPasswordScreen] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  // Form Input validation
  const [error, setError] = useState('');
  const validate = () => {
    if (!formInput?.email.includes('@')) {
      setError('Invalid email address');
      return false;
    }
    setError('');
    return true;
  };
  

  const handleCreate = async () => {
    if(validate()) {
      setIsScreenLoading(true);
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
      setIsScreenLoading(false);
    }
  }
  const handleVerify = async () => {
    setIsScreenLoading(true);
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
    if(response?.isVerified) {
      navigation.navigate('Profile');
    }
    setIsScreenLoading(false);
  };

  const checkSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  
    if (!hasHardware || !isEnrolled) {
      alert("Biometric authentication not available or not set up.");
      return false;
    }
    alert("Biometric authentication is available.");
    return true;
  };

  const authenticate = async () => {
    const supported = await checkSupport();
    if (!supported) return;
  
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with fingerprint",
      fallbackLabel: "Enter passcode", // Only works on iOS
      disableDeviceFallback: true,     // Prevents fallback to PIN/Pattern on Android
    });
    alert(JSON.stringify(result));

    if (result.success) {
      // Proceed with login or unlock logic
      alert("Authentication successful!");
    } else {
      alert("Authentication failed or canceled.");
    }
  };

  useEffect(() => {
    checkSupport()
  }, []);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        style={styles.mainWrpper}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.formContainer}>
          <View style={styles.loginContainer}>
            <AppText style={{ fontSize: 32, lineHeight: 36 }}>Sign in or create an account.</AppText>
            {isScreenLoading ? 
              <View style={styles.activityContainer}>
                <ActivityIndicator color="#999" />
              </View> :
              <View>
                {isEmailScreen ? <View>
                  <InputText
                    placeholderText="Enter your email"
                    handleChange={handlChange}
                    label={'Email'}
                    name={'email'}
                    style={{ marginBottom: 16 }}
                    errorMessage={error}
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
              </View>
            }
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={handleCreate}
              activeOpacity={0.8}
            >
              <AppText style={styles.buttonText}>Continue with Google</AppText>
            </TouchableOpacity>
            <View onTouchStart={authenticate} style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
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
  activityContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: 150,
    alignItems: 'center'
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
    display: 'flex',
    justifyContent: 'center'
  },
});

export default Login;
