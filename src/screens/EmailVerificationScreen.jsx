import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import {Colors} from '../utils/CustomCss';
import Logo from '../components/Logo';
import { useNavigation } from '@react-navigation/native';

const EmailVerificationScreen = () => {
  const [verified, setVerified] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    checkVerificationStatus();
  }, []);


  const handleContinueBtn = () => {
    navigation.navigate('ResumeUpload');
  }

  const checkVerificationStatus = () => {
    auth().onAuthStateChanged(async user => {
      if (user) {
        await user.reload();
        setVerified(user.emailVerified);
        setRefreshing(false);
      }
    });
  };

  const renderWaitingView = () => (
    <View style={styles.messageContainer}>
      <Image
        source={require('../assets/pending.png')}
        style={styles.illustration}
      />
      <Text style={styles.text}>
        Your email is not verified. Please check your email and verify your
        account.
      </Text>
    </View>
  );

  const renderVerifiedView = () => (
    <View style={styles.messageContainer}>
      <Image
        source={require('../assets/verified.png')}
        style={styles.illustration}
      />
      <Text style={styles.text}>Your email is verified!</Text>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinueBtn}>
        <Text style={styles.continueButtonText}>Continue</Text>
        <Icon
          name="arrow-alt-circle-right"
          size={20}
          color={Colors.Light.TEXT}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <Animatable.View
          animation="bounceInLeft"
          duration={1000}
          delay={500}
          style={styles.topLeftContainer}></Animatable.View>
        <Logo logo={'light'} animate={false} />
        {verified ? renderVerifiedView() : renderWaitingView()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.Light.PRIMARY,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  messageContainer: {
    marginVertical: '10%',
  },
  topLeftContainer: {
    position: 'absolute',
    top: 0,
    left: -70,
    width: '85%',
    height: '14.5%',
    borderTopRightRadius: 70,
    borderBottomRightRadius: 70,
    backgroundColor: Colors.Light.TEXT,
  },
  illustration: {
    width: 350,
    height: 350,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Light.TEXT,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  continueButton: {
    marginVertical: 20,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.Light.SECONDARY,
    elevation: 4,
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  continueButtonText: {
    color: Colors.Light.TEXT,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmailVerificationScreen;
