import React from 'react';
import { View, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home Page</Text>
      <Button title="SOS" onPress={() => { }} />
      <Button title="Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
};

export default HomeScreen;
