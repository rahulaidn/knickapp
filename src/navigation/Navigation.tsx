import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import MenuScreen from './MenuScreen';
import ProfileScreen from './ProfileScreen';
import ContactsScreen from './ContactsScreen';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{
            headerShown:false
        }}/>
        <Stack.Screen name="Menu" component={MenuScreen} options={{
            headerShown:false
        }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
            headerShown:false
        }}/>
        <Stack.Screen name="Contacts" component={ContactsScreen} options={{
            headerShown:false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
