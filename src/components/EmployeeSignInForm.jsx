import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/CustomCss';
import * as Animatable from 'react-native-animatable';

const FancyToast = ({message}) => (
  <Animatable.View
    style={styles.fancyToastContainer}
    animation="fadeIn"
    duration={500}
    delay={500}>
    <Icon
      name="check-circle"
      size={20}
      color={Colors.Light.TEXT}
      style={styles.toastIcon}
    />
    <Text style={styles.fancyToastText}>{message}</Text>
  </Animatable.View>
);

const SignInForm = () => {
  const [isForgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);
  const [showFancyToast, setShowFancyToast] = useState(false);

  const toggleForgotPasswordModal = () => {
    setForgotPasswordModalVisible(!isForgotPasswordModalVisible);
  };

  const handleSendResetLink = () => {
    Keyboard.dismiss();
    toggleForgotPasswordModal();
    setShowFancyToast(true);
    setTimeout(() => {
      setShowFancyToast(false);
    }, 3000);
  };

  return (
    <>
      {isForgotPasswordModalVisible && (
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
      )}
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color={Colors.Light.TEXT} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Company/Email"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="lock"
            size={20}
            color={Colors.Light.TEXT}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
          />
          <Icon
            name="eye"
            size={20}
            color={Colors.Light.TEXT}
            style={styles.icon}
          />
        </View>

        <TouchableOpacity onPress={toggleForgotPasswordModal}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
          <Icon
            name="sign-in-alt"
            size={20}
            color={Colors.Light.TEXT}
            style={styles.icon}
          />
        </TouchableOpacity>

        {showFancyToast && <FancyToast message="Password Reset Link Sent" />}

        {/* Forgot Password Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isForgotPasswordModalVisible}
          onRequestClose={toggleForgotPasswordModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Forgot Password?</Text>
              <Text style={styles.modalText}>
                Enter your email address and we'll send you a link to reset your
                password.
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSendResetLink}>
                <Text style={styles.modalButtonText}>Send Reset Link</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleForgotPasswordModal}>
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
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
    color: '#333',
  },
  signInButton: {
    backgroundColor: Colors.Light.SECONDARY,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
  signInButtonText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: Colors.Light.TEXT,
    fontSize: 14,
    marginBottom: 10,
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
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Light.TEXT,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: Colors.Light.TEXT,
    marginBottom: 20,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
    color: Colors.Light.TEXT,
  },
  modalButton: {
    backgroundColor: Colors.Light.SECONDARY,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 4,
  },
  modalButtonText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCloseText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  fancyToastContainer: {
    backgroundColor: Colors.Light.SECONDARY,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    transform: [{translateY: 100}],
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: Colors.Light.Text,
    elevation: 4,
    zIndex: 999,
  },
  fancyToastText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  toastIcon: {
    marginRight: 10,
  },
});

export default SignInForm;