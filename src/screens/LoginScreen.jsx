import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import Logo from '../components/Logo';
import AuthHeader from '../components/AuthHeader';
import EmployerSignInForm from '../components/EmployerSignInForm';
import EmployerSignUpForm from '../components/EmployerSignUpForm';
import CandidateSignInForm from '../components/CandidateSignInForm';
import CandidateSignUpForm from '../components/CandidateSignUpForm';
import Toast from '../components/Toast';
import UserTypeSelectionScreen from './UserTypeSelectionScreen';
import {Colors} from '../utils/CustomCss';

const LoginScreen = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [userType, setUserType] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUserTypeSelect = selectedUserType => {
    console.log(selectedUserType);
    setUserType(selectedUserType);
    setActiveForm('SignUp');
  };

  const handleToast = (message, success) => {
    setToastMessage(message);
    setSuccess(success);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {!userType ? (
        <UserTypeSelectionScreen onUserTypeSelect={handleUserTypeSelect} />
      ) : (
        <>
          <StatusBar backgroundColor={Colors.Light.PRIMARY} />
          <View style={styles.loginContainer}>
            {showToast && <Toast message={toastMessage} success={success} />}
            <Logo logo={'dark'} animate={false} />
            <AuthHeader
              onSignInPress={() => setActiveForm('SignIn')}
              onSignUpPress={() => setActiveForm('SignUp')}
              activeForm={activeForm}
            />
            {activeForm === 'SignIn' ? (
              userType === 'Employee' ? (
                <EmployerSignInForm showToast={handleToast} />
              ) : (
                <CandidateSignInForm showToast={handleToast} />
              )
            ) : userType === 'Employee' ? (
              <EmployerSignUpForm showToast={handleToast} />
            ) : (
              <CandidateSignUpForm showToast={handleToast} />
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Light.PRIMARY,
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
