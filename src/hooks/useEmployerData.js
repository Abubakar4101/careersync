import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {endpoint} from './host';


export const save = async (
  companyName,
  email,
  password,
  confirmPassword,
  industry,
  description,
  contactInformation,
) => {
  try {
    if (
      !companyName ||
      !email ||
      !password ||
      !confirmPassword ||
      !industry ||
      !description ||
      !contactInformation
    ) {
      return {success: false, message: 'Please fill all the fields'};
    }

    if (password !== confirmPassword) {
      return {success: false, message: 'Passwords do not match'};
    }

    if (password.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters long',
      };
    }

    await auth().createUserWithEmailAndPassword(
      email,
      password,
    ).then((userCredential) => {
      auth().currentUser.sendEmailVerification();
    })
    // const response = await axios.post(endpoint('/api/employer'), {
    //   employer_ID: userCredential.user.uid,
    //   employer_companyName: companyName,
    //   employer_email: email,
    //   employer_industry: industry,
    //   employer_description: description,
    //   employer_contactInformation: contactInformation,
    // });
    // if (response.status === 201) {
    //   return {success: true, message: 'Account created successfully!'};
    // } else {
    //   return {
    //     success: false,
    //     message: 'Failed to create account. Please try again.',
    //   };
    // }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return {success: false, message: 'That email address is already in use!'};
    }

    if (error.code === 'auth/invalid-email') {
      return {success: false, message: 'That email address is invalid!'};
    }

    return {success: false, message: 'An error occurred. Please try again.'};
  }
};

export const verify = async (email, password) => {
  try {
    if (!email || !password) {
      console.log('Please fill all the fields');
      return {success: false, message: 'Please fill all the fields'};
    }

    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    return {success: true, message: 'Signed in successfully!'};
  } catch (error) {
    console.log(error.code);
    if (error.code === 'auth/invalid-credential') {
      return {success: false, message: 'Employer Credentials are Incorrect'};
    }

    return {success: false, message: 'An error occurred. Please try again.'};
  }
};