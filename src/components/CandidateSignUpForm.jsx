import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/CustomCss';
import {
  save,
  googleLogin,
  githubLogin,
  githubLogout,
} from '../hooks/useCandidateData';

const CandidateSignUpForm = ({showToast}) => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [jobLocations, setJobLocations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpPress = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const result = await save(
        fullName,
        email,
        password,
        confirmPassword,
        jobLocations,
      );
      setLoading(false);
      showToast(result.message, result.success);
    } catch (error) {
      showToast(error.message, error.success);
    }
  };

  const handleGoogleLogin = async () => {
    Keyboard.dismiss();
    try {
      const result = await googleLogin();
      showToast(result.message, result.success);
    } catch (error) {
      showToast(error.message, error.success);
    }
  };

  const handleGithubLogin = async () => {
    Keyboard.dismiss();
    try {
      const result = await githubLogin();
      showToast(result.message, result.success);
    } catch (error) {
      showToast(error.message, error.success);
    }
  };
  const handleGithubLogout = async () => {
    Keyboard.dismiss();
    try {
      const result = await githubLogout();
      showToast(result.message, result.success);
    } catch (error) {
      showToast(error.message, error.success);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Icon
          name="user"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name="at"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
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
            name={showPassword ? 'eye-slash' : 'eye'}
            size={20}
            color={Colors.Light.TEXT}
            style={styles.icon}
          />
        </TouchableOpacity>
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
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name="map-marker-alt"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Preferred Job Locations"
          placeholderTextColor="#aaa"
          value={jobLocations}
          onChangeText={text => setJobLocations(text)}
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUpPress}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.Light.TEXT} />
        ) : (
          <>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
            <Icon
              name="sign-in-alt"
              size={20}
              color={Colors.Light.TEXT}
              style={styles.icon}
            />
          </>
        )}
      </TouchableOpacity>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
        <Icon
          name="google"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton} onPress={handleGithubLogin}>
        <Icon
          name="github"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <Text style={styles.socialButtonText}>Continue with GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={handleGithubLogout}>
        <Icon
          name="github"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <Text style={styles.socialButtonText}>logout GitHub</Text>
      </TouchableOpacity>
    </ScrollView>
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
    color: Colors.Light.TEXT,
  },
  signUpButton: {
    backgroundColor: Colors.Light.SECONDARY,
    elevation: 4,
    width: '100%',
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
    width: '100%',
  },
  socialButtonText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CandidateSignUpForm;