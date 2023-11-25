import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../utils/CustomCss';
import {save} from '../hooks/useEmployerData';

const EmployerSignUpForm = ({showToast}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUpPress = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const result = await save(
        companyName,
        email,
        password,
        confirmPassword,
        industry,
        description,
        contactInformation,
      );
      setLoading(false);
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
          name="building"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="#aaa"
          value={companyName}
          onChangeText={text => setCompanyName(text)}
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
          name="industry"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Industry"
          placeholderTextColor="#aaa"
          value={industry}
          onChangeText={text => setIndustry(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name="info"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#aaa"
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name="phone"
          size={20}
          color={Colors.Light.TEXT}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Information"
          placeholderTextColor="#aaa"
          value={contactInformation}
          onChangeText={text => setContactInformation(text)}
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
});

export default EmployerSignUpForm;