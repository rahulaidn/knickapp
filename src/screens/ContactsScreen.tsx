import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, firestore } from '../utils/firebaseUtils';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const ContactsScreen: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const users = querySnapshot.docs.map(doc => doc.data());
      setContacts(users);
    };
    fetchContacts();
  }, []);

  const handleAddContact = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      // Open phone gallery and select users
      // Example code for adding selected contacts to Firebase DB
      const selectedUsers = []; // Replace with actual selected users
      for (const user of selectedUsers) {
        await addDoc(collection(firestore, 'contacts'), {
          userId: auth.currentUser?.uid,
          contactId: user.id,
        });
      }
    }
  };

  return (
    <View>
      <Button title="Add Contact" onPress={handleAddContact} />
      {contacts.map((contact, index) => (
        <Text key={index}>{contact.displayName}</Text>
      ))}
    </View>
  );
};

export default ContactsScreen;
