import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import Logo from '../components/Logo';
import { Colors } from '../utils/CustomCss';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    function onAnimationComplete() {
        navigation.navigate('Login');
    }
  return (
    <>
    <StatusBar backgroundColor={Colors.Light.TEXT} />
    <View style={styles.container}>
      <Logo logo={'light'} animate={true} onAnimationComplete={onAnimationComplete} />
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Light.TEXT,
  },
});

export default SplashScreen;
