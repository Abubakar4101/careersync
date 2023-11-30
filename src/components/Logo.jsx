import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const Logo = ({ logo, animate, onAnimationComplete }) => {
  const heartbeatAnim = React.useRef(new Animated.Value(1)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  const displayedLogo =
    logo === 'light'
      ? require('../assets/careersync-light.png')
      : require('../assets/careersync-dark.png');

  useEffect(() => {
    if (animate) {
      const heartbeatAnimation = Animated.sequence([
        Animated.timing(heartbeatAnim, {
          toValue: 1.5,
          duration: 500, 
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 500, 
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 500, 
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.1,
          duration: 500, 
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]);

      const rotateAnimation = Animated.timing(rotateAnim, {
        toValue: 360, 
        duration: 1000,
        useNativeDriver: true,
      });

      const loopedAnimation = Animated.loop(heartbeatAnimation);
      loopedAnimation.start();

      setTimeout(() => {
        loopedAnimation.stop();
        rotateAnimation.start(() => onAnimationComplete());
      }, 6000);

      return () => {
        loopedAnimation.stop();
      };
    }
  }, [animate, heartbeatAnim]);

  const interpolatedRotate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={displayedLogo}
        style={[
          styles.logo,
          {
            transform: [
              {
                scale: heartbeatAnim,
              },
              {
                rotate: interpolatedRotate,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Logo;
