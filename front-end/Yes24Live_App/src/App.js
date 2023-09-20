import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme/theme';
import Navigation from './navigators';
import { UserProvider, ProgressProvider } from './contexts';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <ProgressProvider>
          <UserProvider>
            <StatusBar
              backgroundColor={theme.background}
              barStyle="dark-content"
            />
            <Navigation />
          </UserProvider>
        </ProgressProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
