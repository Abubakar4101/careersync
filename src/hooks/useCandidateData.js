import axios from 'axios';
import auth from '@react-native-firebase/auth';

export const save = async (name, email, password, confirmPassword, jobLocations) => {
  try {
    if (!name || !email || !password || !confirmPassword || !jobLocations) {
      return { success: false, message: 'Please fill all the fields' };
    }

    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long' };
    }

    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    const response = await axios.post('http://192.168.100.235:3000/api/candidate', {
      candidate_ID: userCredential.user.uid, 
      candidate_name: name,
      candidate_email: email,
      candidate_location: jobLocations,
    });

    if (response.status === 201) {
      return { success: true, message: 'Account created successfully!' };
    } else {
      return { success: false, message: 'Failed to create account. Please try again.' };
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return { success: false, message: 'That email address is already in use!' };
    }

    if (error.code === 'auth/invalid-email') {
      return { success: false, message: 'That email address is invalid!' };
    }

    return { success: false, message: 'An error occurred. Please try again.' };
  }
};

export const verify = async (email, password) => {
  try {
    if (!email || !password) {
      console.log('Please fill all the fields');
      return { success: false, message: 'Please fill all the fields' };
    }

    const userCredential = await auth().signInWithEmailAndPassword(email, password);

    return { success: true, message: 'Signed in successfully!' };
  } catch (error) {
    console.log(error.code);
    if (error.code === 'auth/invalid-credential') {
      return { success: false, message: 'Candidate Credentials are Incorrect' };
    }

    return { success: false, message: 'An error occurred. Please try again.' };
  }
};
