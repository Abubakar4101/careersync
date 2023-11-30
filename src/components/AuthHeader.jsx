import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Colors, Fonts} from '../utils/CustomCss';

const AuthHeader = ({onSignInPress, onSignUpPress, activeForm}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={Colors.Light.PRIMARY}
        style={[styles.button, activeForm === 'SignIn' && styles.activeButton]}
        onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={Colors.Light.PRIMARY}
        style={[styles.button, activeForm === 'SignUp' && styles.activeButton]}
        onPress={onSignUpPress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 5,
    width: '100%',
    padding: 15,
    borderRadius: 30,
    backgroundColor: Colors.Light.PRIMARY,
    elevation: 4,
    marginVertical: 10,
  },
  button: {
    padding: 20,
    width: '50%',
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: Colors.Light.SECONDARY,
    elevation: 4,
  },
  buttonText: {
    color: Colors.Light.TEXT,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: Fonts.BOLDITALIC,
  },
});

export default AuthHeader;
