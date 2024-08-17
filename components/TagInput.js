// components/Tag.js
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import tw from 'twrnc';

const Tag = ({ tag, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-3 py-1 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-gray-200'}`}
    >
      <Text style={tw`${isSelected ? 'text-white' : 'text-gray-700'}`}>{tag}</Text>
    </TouchableOpacity>
  );
};

export default Tag;
