import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {MyContextControllerProvider} from './src/context/';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Router from './src/screens/Router';

// eslint-disable-next-line no-unused-vars
const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      <MyContextControllerProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </MyContextControllerProvider>
    </PaperProvider>
  );
};

export default App;
