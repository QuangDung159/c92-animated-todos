import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Sidebar from 'components/sidebar';
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
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default App;
