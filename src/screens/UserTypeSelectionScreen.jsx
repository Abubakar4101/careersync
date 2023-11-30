import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Logo from '../components/Logo';
import {Colors} from '../utils/CustomCss';

const UserTypeSelectionScreen = ({onUserTypeSelect}) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.Light.PRIMARY} />
      <View style={styles.container}>
        <Animatable.View animation="bounceInLeft" duration={1000} delay={500}  style={styles.topLeftContainer}></Animatable.View>
        <Logo logo={'light'} animate={false} />
        <Image style={styles.heroImage}  source={require('../assets/user-selection.png')} />
        <Animatable.View
          style={styles.selectionContainer}
          animation="slideInUp"
          duration={1000}
          delay={500}>
          <Text style={styles.title}>Select User Type</Text>

          <TouchableHighlight
            style={[styles.button, {backgroundColor: Colors.Light.PRIMARY}]}
            onPress={() => onUserTypeSelect('Candidate')}
            underlayColor={Colors.Light.SECONDARY}
            >
            <Text style={styles.buttonText}>Candidate</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, {backgroundColor: Colors.Light.PRIMARY}]}
            onPress={() => onUserTypeSelect('Employee')}
            underlayColor={Colors.Light.SECONDARY}
            >
            <Text style={styles.buttonText}>Employee</Text>
          </TouchableHighlight>
        </Animatable.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.Light.PRIMARY,
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
  heroImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  selectionContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.Light.TEXT,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: Colors.Light.PRIMARY,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    margin: 10,
    borderRadius: 8,
    width: '100%',
    borderRadius: 15,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.Light.TEXT,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserTypeSelectionScreen;
