/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { commonStyles } from '@myapp/utilities/common-styles';
import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootContext from '@myapp/context/root';
import RootRoutes from '@myapp/routes/root';


function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootContext>
          <View style={[commonStyles.container]}>
            <RootRoutes />
          </View>
        </RootContext>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
