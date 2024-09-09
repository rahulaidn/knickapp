import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth, firestore } from '../utils/firebaseUtils';
import { doc, updateDoc } from 'firebase/firestore';

const ProfileScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleUpdatePhoneNumber = async () => {
    if (auth.currentUser) {
      await updateDoc(doc(firestore, 'users', auth.currentUser.uid), {
        phoneNumber: phoneNumber,
      });
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Update Phone Number" onPress={handleUpdatePhoneNumber} />
    </View>
  );
};

export default ProfileScreen;
