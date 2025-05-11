/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, { FC, useEffect, memo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { API_URL, PHOTO_URL } from '@env';

import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import Card from '../Card';

interface StudentsListProps {
  navigation: any;
}

const Home: FC<StudentsListProps> = ({ navigation }) => {

  const { loginUser, userCounter } = useSelector((state: any) => state.users);
  // const infoRedux = useSelector((state: any) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loginUser?.email) {
      navigation.navigate('Login');
    } else {
      Toast.show({
        type: 'info',
        text1: 'This is an info message',
      });
    }
  }, [loginUser?.email, navigation]);

    useEffect(() => {
      dispatch({
        type: 'apiRequest',
        payload: {
          url: `${API_URL}/account/user-info`,
          method: 'POST',
          onError: 'GLOBAL_MESSAGE',
          dispatchType: 'userInfo',
          body: {
            email: loginUser?.email
          }
        },
      });
    }, [dispatch]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.sectionContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Card
            // title={`Welcome, ${loginUser?.firstName} ${loginUser?.lastName}`}
            title={`Welcome, ${loginUser?.email}`}
            content={loginUser?.designation}
            image={`${PHOTO_URL}/${loginUser?.profilePhoto}`}
            customStyles={{ backgroundColor: '#F3C623' }}
            customStylesHeading1={{ fontSize: 18, fontWeight: '600', color: '#000' }}
            customStylesHeading2={{ fontSize: 16, fontWeight: '600', color: '#666', marginTop: 4 }}
          />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
            <Card
              title="Students"
              content={userCounter?.students}
              image=""
              customStyles={{ backgroundColor: '#183B4E', width: '48%'}}
              customStylesHeading1={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
              customStylesHeading2={{ fontSize: 32, fontWeight: '600', color: '#fff', marginTop: 4 }}
            />
            <Card
              title="Staffs"
              content={userCounter?.teachers}
              image=""
              customStyles={{ backgroundColor: '#27548A', width: '48%'}}
              customStylesHeading1={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
              customStylesHeading2={{ fontSize: 32, fontWeight: '600', color: '#fff', marginTop: 4 }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flexGrow: 1,
    padding: '5%',
  },
});

export default memo(Home);
