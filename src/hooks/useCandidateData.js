import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {endpoint} from './host';
import { authorize, logout } from 'react-native-app-auth';


const config = {
  redirectUrl: 'com.careersync://oauthredirect',
  clientId: 'Iv1.d3ef10cea4470ebd',
  clientSecret: '05d2c63686ab802f6ae2f24512bd4d94b5ecfd74',
  scopes: ["identity", "user:email", "user:follow"],
  additionalHeaders: { 'Accept': 'application/json' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/Iv1.d3ef10cea4470ebd'
  }
};


GoogleSignin.configure({
  webClientId:
    '842237236935-1v2iumctagpgrbh17pavird1t7p2dk7k.apps.googleusercontent.com',
});

export const save = async (
  name,
  email,
  password,
  confirmPassword,
  jobLocations,
) => {
  try {
    if (!name || !email || !password || !confirmPassword || !jobLocations) {
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

    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log(userCredential.user.uid, name, email, jobLocations);
    const response = await axios.post(endpoint('/api/candidate'), {
      candidate_ID: userCredential.user.uid,
      candidate_name: name,
      candidate_email: email,
      candidate_location: jobLocations,
    });
    console.log('Response --->> ', response);
    if (response.status === 201) {
      return {success: true, message: 'Account created successfully!'};
    } else {
      return {
        success: false,
        message: 'Failed to create account. Please try again.',
      };
    }
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
      return {success: false, message: 'Candidate Credentials are Incorrect'};
    }

    return {success: false, message: 'An error occurred. Please try again.'};
  }
};

export const githubLogin = async () => {
  try {
    // Start the GitHub OAuth flow
    const authState = await authorize(config);

    // Use the access token to authenticate with Firebase
    const githubCredential = auth.GithubAuthProvider.credential(authState.accessToken);
    const userCredential = await auth().signInWithCredential(githubCredential);

    // Handle successful authentication
    console.log('Logged in with GitHub:', userCredential.user);
    return { success: true, message: 'Logged in with GitHub!' };
  } catch (error) {
    console.error('GitHub Login Error:', error);
    return { success: false, message: 'GitHub login failed. Please try again.' };
  }
};

export const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);

    const response = await axios.post(endpoint('/api/candidate'), {
      candidate_ID: userCredential.user.uid,
      candidate_name: userCredential.user.displayName,
      candidate_email: userCredential.user.email,
      candidate_location: null,
    });
    console.log(response);

    if (response.status === 201) {
      return {success: true, message: 'Account created successfully!'};
    } else {
      return {
        success: false,
        message: 'Failed to create account. Please try again.',
      };
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return {success: false, message: 'That email address is already in use!'};
    }

    if (error.code === 'auth/invalid-email') {
      return {success: false, message: 'That email address is invalid!'};
    }

    console.log(error);
    return {success: false, message: 'An error occurred. Please try again.'};
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const githubLogout = async () => {
  try{
    await auth().signOut();
    return {success: true, message: 'Logged out successfully!'};
  }catch(error){
    console.error(error);
  }
}
