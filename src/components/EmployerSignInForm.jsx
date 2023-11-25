import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/CustomCss';
import {verify} from '../hooks/useEmployerData';

const EmployerSignInForm = ({showToast}) => {
  const [isForgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleForgotPasswordModal = () => {
    setForgotPasswordModalVisible(!isForgotPasswordModalVisible);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendResetLink = () => {
    Keyboard.dismiss();
    showToast('Reset link sent to your email', true);
    toggleForgotPasswordModal();
  };

  const handleSignIn = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const result = await verify(email, password);
      setLoading(false);
      showToast(result.message, result.success);
    } catch (error) {
      showToast(error.message, error.success);
    }
  };

  return (
    <>
      {isForgotPasswordModalVisible && (
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
      )}
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon
            name="user"
            size={20}
            color={Colors.Light.TEXT}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username/Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={text => setEmail(text)}
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
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color={Colors.Light.TEXT}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <Text
            style={styles.forgotPasswordText}
            onPress={toggleForgotPasswordModal}>
            Forgot Password?
          </Text>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.Light.TEXT} />
          ) : (
            <>
              <Text style={styles.signInButtonText}>Sign In</Text>
              <Icon
                name="sign-in-alt"
                size={20}
                color={Colors.Light.TEXT}
                style={styles.icon}
              />
            </>
          )}
        </TouchableOpacity>

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
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
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
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: Colors.Light.TEXT,
    fontSize: 14,
    marginBottom: 10,
    textDecorationLine: 'underline',
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
});

export default EmployerSignInForm;