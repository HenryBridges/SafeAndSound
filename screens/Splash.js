import React from 'react';
import { View, Image, SafeAreaView, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { appIcon } from '../assets/images/images'

const Splash = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View>
                    <Image source={appIcon} />
                </View>
                <ActivityIndicator
                    style={{
                        marginTop: 50
                    }}
                    size='large' />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Splash;
