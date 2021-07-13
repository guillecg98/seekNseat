import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import App from './app/App';

export default function Main() {
    return(
        <PaperProvider>
            <App />
        </PaperProvider>
    )
}

AppRegistry.registerComponent('main', () => App);
