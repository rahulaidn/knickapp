import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Contacts" onPress={() => navigation.navigate('Contacts')} />
    </View>
  );
};

export default MenuScreen;
