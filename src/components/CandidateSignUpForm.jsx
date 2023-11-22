import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../utils/CustomCss';
import { save } from '../hooks/useCandidateData';

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [jobLocations, setJobLocations] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSignUpPress = async () => {
    setLoading(true);

    const result = await save(fullName, email, password, confirmPassword, jobLocations);

    setLoading(false);

    setAlertMessage(result.message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color={Colors.Light.TEXT} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="at" size={20} color={Colors.Light.TEXT} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color={Colors.Light.TEXT} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Icon name="eye" size={20} color={Colors.Light.TEXT} style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color={Colors.Light.TEXT} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="map-marker-alt" size={20} color={Colors.Light.TEXT} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Preferred Job Locations"
          placeholderTextColor="#aaa"
          value={jobLocations}
          onChangeText={(text) => setJobLocations(text)}
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.Light.TEXT} />
        ) : (
          <>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
            <Icon name="sign-in-alt" size={20} color={Colors.Light.TEXT} style={styles.icon} />
          </>
        )}
      </TouchableOpacity>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <Icon name="google" size={20} color={Colors.Light.TEXT} style={styles.icon} />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Icon name="github" size={20} color={Colors.Light.TEXT} style={styles.icon} />
        <Text style={styles.socialButtonText}>Continue with GitHub</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{alertMessage}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.Light.TEXT,
  },
  signUpButton: {
    backgroundColor: Colors.Light.SECONDARY,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
  signUpButtonText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.Light.TEXT,
  },
  orText: {
    marginHorizontal: 10,
    color: Colors.Light.TEXT,
    fontSize: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Light.PRIMARY,
    elevation: 4,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  socialButtonText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.Light.PRIMARY,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: Colors.Light.TEXT,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.Light.SECONDARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  modalButtonText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpForm;
