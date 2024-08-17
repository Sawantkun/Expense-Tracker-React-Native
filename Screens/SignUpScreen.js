import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import signInImage from "../assets/Images/signup.png";
import { colors } from '../themes';
import { FIREBASE_AUTH } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const auth = FIREBASE_AUTH;

  const SignUp = async () => {
    setLoading(true); // Show loading spinner
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', response.user);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      console.log('Error:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <ScreenWrapper>
      <View style={tw`justify-center items-center p-4`}>
        <Image
          source={signInImage}
          style={tw`w-96 h-96 mb-0 rounded-full`}
        />
        <Text style={tw`text-4xl font-bold mb-4`}>Sign Up</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={tw`w-80 border-b border-gray-300 p-2 mb-4`}
          value={email}
          onChangeText={setEmail}
        />
        <View style={tw`w-80 border-b border-gray-300 mb-2 flex-row items-center`}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={tw`flex-1 p-2`}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={tw`mb-6 w-full`}>
          <Text style={tw`text-gray-500 text-right px-2`}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`shadow rounded-full p-3 mt-4 w-80`, { backgroundColor: colors.buttonbg }]}
          onPress={SignUp}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" /> // Show spinner while loading
          ) : (
            <Text style={tw`text-white text-center text-lg font-bold`}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
