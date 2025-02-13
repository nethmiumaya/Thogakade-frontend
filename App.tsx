// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PosProvider } from './src/context/posContext';
import AppNavigator from "./src/navigation/appNavigator";

export default function App() {
    return (
        <PosProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </PosProvider>
    );
}
