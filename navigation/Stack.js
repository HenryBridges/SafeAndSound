import React from 'react';
import AppDrawer from "./AppDrawer";
import 'react-native-gesture-handler';
import Venue from '../screens/Venue';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const DetailStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            orientation: 'portrait_up'
        }}
    >
        <Stack.Screen component={AppDrawer} name='Login' />
        <Stack.Screen component={Venue} name='Venue' />
    </Stack.Navigator>
);

export default DetailStack;