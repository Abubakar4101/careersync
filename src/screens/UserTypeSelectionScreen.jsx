import React from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Logo from '../components/Logo';
import { Colors } from '../utils/CustomCss';

const UserTypeSelectionScreen = ({ onUserTypeSelect }) => {

  return (
    <>
      <StatusBar backgroundColor={Colors.Light.PRIMARY} />
      <Animatable.View style={styles.container} animation="fadeInUp" duration={1000} delay={500}>
        <Logo logo={'dark'} animate={false} />

        <Animatable.Text style={styles.title} animation="fadeIn" duration={1000} delay={300}>
          Select User Type
        </Animatable.Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.Light.SECONDARY }]}
          onPress={() => onUserTypeSelect('Candidate')}
          animation="fadeIn"
          duration={1000}
          delay={500}
        >
          <Text style={styles.buttonText}>Candidate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.Light.PRIMARY }]}
          onPress={() => onUserTypeSelect('Employee')}
          animation="fadeIn"
          duration={1000}
          delay={700}
        >
          <Text style={styles.buttonText}>Employee</Text>
        </TouchableOpacity>
      </Animatable.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Light.PRIMARY,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: Colors.Light.TEXT,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    margin: 10,
    borderRadius: 8,
    width: '100%',
    borderRadius: 15,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.Light.TEXT,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserTypeSelectionScreen;
