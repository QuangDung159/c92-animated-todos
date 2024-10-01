import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import AboutScreen from 'screens/about';
import MainScreen from 'screens/main';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#000000',
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default App;
