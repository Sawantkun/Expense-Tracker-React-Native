import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';

export default function EmptyArray({ message }) {
  return (
    <View style={tw`flex justify-center items-center h-full my-5`}>
      <Image style={tw`h-36 w-36 shadow`} source={require('../assets/Images/empty.png')}/>
      <Text style={tw`font-bold text-gray-400`}>{message}</Text>
    </View>
  );
}
