import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import sigin from "../assets/Images/login.png";
import { colors } from '../themes';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const SignIn = async () => {
    setLoading(true); // Show loading spinner
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', response.user);
      Alert.alert('Success', 'Signed in successfully!', [
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
          source={sigin}
          style={tw`w-96 h-96 mb-0 rounded-full`}
        />
        <Text style={tw`text-4xl font-bold mb-4`}>Sign In</Text>
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
          onPress={SignIn}
          style={[tw`shadow rounded-full p-3 mt-4 w-80`, { backgroundColor: colors.buttonbg }]}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" /> // Show spinner while loading
          ) : (
            <Text style={tw`text-white text-center text-lg font-bold`}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
