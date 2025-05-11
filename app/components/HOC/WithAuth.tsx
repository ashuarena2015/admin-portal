import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WithAuthLayout = (WrappedComponent: React.ComponentType) => {

  const ComponentWithAuthLayout = (props: any) => {

    const { navigation, loginUser } = props;
    const isAuthenticated = loginUser?.email;

    const goToLogin = () => {
        navigation.navigate('Login');
    }

    if (!isAuthenticated) {
        return <View>
            <Text>You can not access this page.</Text>
            <Button title="Login" onPress={goToLogin} />
        </View>
    }

    console.log({ isAuthenticated});

    return <View style={styles.layoutContainer}><WrappedComponent {...props} /></View>
  };

  return ComponentWithAuthLayout;
};

const styles = StyleSheet.create({
  layoutContainer: {
    paddingTop: 32,
    backgroundColor: '#000',
    borderColor: 'red',
    flex: 1,
    height: '100%',
  }
});

export default WithAuthLayout;
