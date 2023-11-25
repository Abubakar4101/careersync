import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const Logo = ({ logo, animate, onAnimationComplete }) => {
  const heartbeatAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const displayedLogo =
    logo === 'light'
      ? require('../assets/careersync-light.png')
      : require('../assets/careersync-dark.png');

  useEffect(() => {
    if (animate) {
      const heartbeatAnimation = Animated.sequence([
        Animated.timing(heartbeatAnim, {
          toValue: 1.5,
          duration: 500, // Scale up quickly
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 500, // Scale down quickly
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.2,
          duration: 500, // Scale up moderately
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 500, // Scale down moderately
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1.1,
          duration: 500, // Scale up slowly
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 500, // Scale down slowly
          useNativeDriver: true,
        }),
      ]);

      const fadeAnimation = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      });

      const scaleAnimation = Animated.timing(scaleAnim, {
        toValue: 10,
        duration: 1000,
        useNativeDriver: true,
      });

      const loopedAnimation = Animated.loop(heartbeatAnimation);
      loopedAnimation.start();

      setTimeout(() => {
        loopedAnimation.stop();
        Animated.parallel([fadeAnimation, scaleAnimation]).start(() => onAnimationComplete());
      }, 6000);

      return () => {
        loopedAnimation.stop();
      };
    }
  }, [animate, heartbeatAnim]);

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
                scale: scaleAnim,
              },
            ],
            opacity: fadeAnim,
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
