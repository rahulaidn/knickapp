import React from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { useAuthRequest } from 'expo-auth-session';
import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../src/utils/firebaseUtils';
import { useNavigation } from '@react-navigation/native';

const App: React.FC = () => {
  const navigation = useNavigation();

  // Facebook app configuration
  const [request, response, promptAsync] = useAuthRequest({
    clientId: '422330175960373',
    redirectUri: 'yourapp://redirect', // Adjust this to your app's redirect URI
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // Exchange the code for an access token
      fetch(`https://graph.facebook.com/oauth/access_token?client_id=${'422330175960373'}&redirect_uri=yourapp://redirect&client_secret=422330175960373&code=${code}`)
        .then((response) => response.json())
        .then(async (data) => {
          const { access_token } = data;

          // Use the access token to sign in with Firebase
          const credential = FacebookAuthProvider.credential(access_token);
          const userCredential = await signInWithCredential(auth, credential);
          const user = userCredential.user;

          // Store user details in Firestore
          await setDoc(doc(firestore, 'users', user.uid), {
            email: user.email,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
          });

          // Navigate to Home Screen after successful login
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.error('Error fetching access token:', error);
          Alert.alert('Login Error', 'An error occurred while exchanging code for access token.');
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <Button
        title="Login with Facebook"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;


// import React from 'react';
// import { View, Button, Alert } from 'react-native';
// import * as Facebook from 'expo-facebook';
// import { auth } from '../src/utils/firebaseUtils'; // Adjust the import path as needed
// import { signInWithCredential, FacebookAuthProvider } from 'firebase/auth';

// const App: React.FC = () => {
//   const handleFacebookLogin = async () => {
//     try {
//       await Facebook.initializeAsync({ appId: '422330175960373' });
//       const result = await Facebook.logInWithReadPermissionsAsync();

//       if (result.type === 'success' && result.token) {
//         const credential = FacebookAuthProvider.credential(result.token);
//         const userCredential = await signInWithCredential(auth, credential);
//         const user = userCredential.user;

//         // You can now navigate to your home screen or handle the logged-in user
//         Alert.alert('Login Successful', `Welcome, ${user.displayName}`);
//       } else {
//         Alert.alert('Login Cancelled', 'Facebook login was cancelled.');
//       }
//     } catch (error) {
//       console.error('Facebook Login Error:', error);
//       Alert.alert('Login Error', 'An error occurred during Facebook login.');
//     }
//   };

//   return (
//     <View>
//       <Button title="Login with Facebook" onPress={handleFacebookLogin} />
//     </View>
//   );
// };

// export default App;
