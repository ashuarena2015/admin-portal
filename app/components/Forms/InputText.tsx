import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputTextProps {
    style?: object;
    handleChange: Function;
    placeholderText: string;
    label?: string;
    name?: string;
}

export default function InputText(props: InputTextProps) {
  return (
    <View style={props?.style}>
    <Text
      style={[{ fontFamily: 'Poppins_400Regular', ...styles.labelText }]}
    >
        {props?.label}
    </Text>
    <TextInput
        style={styles.inputText}
        autoCapitalize="none"
        placeholder={props?.placeholderText}
        placeholderTextColor="#999"
        onChangeText={(text: string) => props?.handleChange(props?.name, text)}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    inputText: {
        borderWidth: 1,
        borderColor: '#cacaca',
        padding: 10,
        borderRadius: 12,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    labelText: {
        fontSize: 16,
        lineHeight: 24,
        paddingTop: 8,
        paddingBottom: 8
    }
});
