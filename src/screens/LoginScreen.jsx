// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import AuthHeader from '../components/AuthHeader';
import EmployeeSignInForm from '../components/EmployeeSignInForm';
import EmployeeSignUpForm from '../components/EmployeeSignUpForm';
import CandidateSignInForm from '../components/CandidateSignInForm';
import CandidateSignUpForm from '../components/CandidateSignUpForm';
import UserTypeSelectionScreen from './UserTypeSelectionScreen';
import { Colors } from '../utils/CustomCss';

const LoginScreen = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [userType, setUserType] = useState(null);


  const handleUserTypeSelect = (selectedUserType) => {
    console.log(selectedUserType);
    setUserType(selectedUserType);
    setActiveForm('SignUp');
  };

  return (
    <View style={styles.container}>
      {!userType ? (
        <UserTypeSelectionScreen onUserTypeSelect={handleUserTypeSelect} />
      ) : (
        <>
        <Logo logo={'dark'} animate={false} />
          <AuthHeader
            onSignInPress={() => setActiveForm('SignIn')}
            onSignUpPress={() => setActiveForm('SignUp')}
            activeForm={activeForm}
          />
          {activeForm === 'SignIn' ? (
            userType === 'Employee' ? <EmployeeSignInForm /> : <CandidateSignInForm />
          ) : (
            userType === 'Employee' ? <EmployeeSignUpForm /> : <CandidateSignUpForm />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Light.PRIMARY,
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
