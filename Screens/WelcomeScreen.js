import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import ScreenWrapper from '../components/ScreenWrapper.js';
import welcome from "../assets/Images/welcome.gif"
import {colors} from "../themes/index.js"
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <ScreenWrapper title="Welcome">
        <View style={tw`flex justify-center items-center`}>
            <Image source={welcome} style={tw`w-96 h-96 shadow`}/>
            <Text style={tw`text-4xl font-bold mt-5`}>ExpenseX</Text>
            <Text style={tw`text-gray-600 text-center max-w-80 text-xl mt-2 mb-8`}>Track your expenses, save money, and improve your budgeting skills.</Text>
            <View>
            <TouchableOpacity onPress={()=>navigation.navigate('SignIn')} style={[tw`shadow rounded-full p-3 mt-4` , {backgroundColor:colors.buttonbg}]} >
                <Text style={tw`text-white text-center text-lg font-bold`}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} style={[tw`shadow rounded-full p-3 mt-4 w-80` , {backgroundColor:colors.buttonbg}]} >
                <Text style={tw`text-white text-center text-lg font-bold`}>Sign Up</Text>
            </TouchableOpacity>
            </View>
        </View>
    </ScreenWrapper>
  )
}