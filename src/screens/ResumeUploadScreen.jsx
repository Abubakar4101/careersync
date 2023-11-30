import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DocumentPicker from 'react-native-document-picker';
import { Colors } from '../utils/CustomCss';
import Logo from '../components/Logo';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ResumeUploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadPress = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Handle the selected file, e.g., save the file URI to state
      setSelectedFile(result.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the file picker
      } else {
        // Handle other errors
        console.error(err);
      }
    }
  };

  return (

    <View style={styles.container}>
      <Animatable.View
        animation="bounceInLeft"
        duration={1000}
        delay={500}
        style={styles.topLeftContainer}
      ></Animatable.View>
      <Logo logo={'light'} animate={false} />
      <View style={styles.resumeContainer}>
        <Image
          style={styles.illustration}
          source={require('../assets/resume-upload.png')}
        />
        <Text style={styles.text}>
          {selectedFile
            ? `Selected file: ${selectedFile}`
            : 'Upload your resume to get started. You can upload your resume later from your profile.'}
        </Text>
        <TouchableOpacity style={styles.fab} onPress={handleUploadPress}>
          <Icon name="upload" size={20} style={styles.fabIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.Light.PRIMARY,
  },
  resumeContainer: {
    marginVertical: '10%',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Light.TEXT,
    textAlign: 'left',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  fab: {
    backgroundColor: Colors.Light.PRIMARY,
    borderRadius: 30,
    padding: 15,
    elevation: 10,
    marginVertical: 20,
    alignSelf: 'flex-end',
  },
  fabIcon: {
    color: Colors.Light.TEXT,
  },
});

export default ResumeUploadScreen;
