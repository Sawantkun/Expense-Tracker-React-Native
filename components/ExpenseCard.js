import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { categoryBG, colors } from '../themes';
import tw from 'twrnc';

export default function ExpenseCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={tw`my-1 rounded-lg`}>
      <View backgroundColor={categoryBG[item.category]} style={tw`flex-row justify-between p-3`}>
        <View>
          <Text style={tw`${colors.heading} font-bold`}>{item.title}</Text>
          <Text style={tw`${colors.heading} text-xs`}>{item.category}</Text>
        </View>
        <View>
          <Text style={tw`font-bold`}>${item.amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
