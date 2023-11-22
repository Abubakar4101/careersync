import { StyleSheet, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../utils/CustomCss';
import React, { useEffect, useState } from 'react'

const Toast = ({ message, success }) => {
    const [toastType, setToastType] = useState(null);
    useEffect(() => {
        switch (success) {
            case true:
                setToastType('check-circle');
                break;
            case false:
                setToastType('exclamation-circle');
                break;
        }
    }, [message, success])
    return (
        <View style={styles.container}>
            <Animatable.View style={styles.fancyToastContainer}
                animation="fadeIn"
                duration={500}
                delay={500}
            >
                <Icon name={toastType} size={20} color={Colors.Light.TEXT} style={styles.toastIcon} />
                <Text style={styles.fancyToastText}>{message}</Text>
            </Animatable.View>
        </View>

    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -200,
        zIndex: 999,
    },
    fancyToastContainer: {
        backgroundColor: Colors.Light.SECONDARY,
        alignItems: 'center',
        gap: 10,
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: Colors.Light.Text,
        elevation: 20,
    },
    fancyToastText: {
        color: Colors.Light.TEXT,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    toastIcon: {
        marginRight: 10,
    },
})

export default Toast
