import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPressHandler}
      style={styles.btnContainer}>
      <Text style={styles.btnText}>{props.btnName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#272727',
    paddingVertical: 15,
    marginVertical: 25,
  },
  btnText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Button;
