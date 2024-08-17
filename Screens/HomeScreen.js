import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput } from 'react-native';
import tw from 'twrnc';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../themes/index';
import randomImage from '../assets/Images/randomImage';
import EmptyArray from '../components/EmptyArray';
import { useNavigation } from '@react-navigation/native';
import hero from "../assets/Images/hero.png";
import { FIREBASE_AUTH } from '../config/firebase'; // Import Firebase auth
import { signOut } from 'firebase/auth'; // Import signOut function

export default function HomeScreen() {
  const [trips, setTrips] = useState([
    { id: '1', name: 'London Eye', name2: 'England' },
    { id: '2', name: 'New York', name2: 'America' },
    { id: '3', name: 'Washington DC', name2: 'America' },
    { id: '4', name: 'Time Square', name2: 'America' },
    { id: '5', name: 'New Delhi', name2: 'India' },
    { id: '6', name: 'Shanghai Centre', name2: 'China' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTripName, setNewTripName] = useState('');
  const [newTripLocation, setNewTripLocation] = useState('');

  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const handleAddTrip = () => {
    if (newTripName && newTripLocation) {
      const newTrip = {
        id: (trips.length + 1).toString(),
        name: newTripName,
        name2: newTripLocation,
      };
      setTrips([...trips, newTrip]);
      setModalVisible(false);
      setNewTripName('');
      setNewTripLocation('');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigation.navigate('SignIn'); // Navigate back to the SignIn screen
    } catch (error) {
      console.error('Error signing out: ', error.message);
    }
  };

  return (
    <ScreenWrapper title="Home" style={tw`flex-1`}>
      {/* HERO SECTION */}
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={[tw`text-2xl shadow-sm font-bold`, { color: colors.heading.replace('text-', '#') }]}>
          ExpenseX
        </Text>
        <TouchableOpacity onPress={handleLogout} style={tw`p-2 px-3 bg-white border rounded-full border-gray-200 ${colors.buttontext}`}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row justify-center items-center bg-blue-200 rounded-xl mx-4`}>
        <Image source={hero} style={tw`w-50 h-45`} />
      </View>

      {/* TRIPS SECTION */}
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={[tw`text-xl shadow-sm font-bold`, { color: colors.heading.replace('text-', '#') }]}>
          Recent Trips
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={tw`p-2 px-3 bg-white border rounded-full border-gray-200 ${colors.buttontext}`}>
          <Text>Add Trip</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 430 }}>
        <FlatList
          data={trips}
          numColumns={2}
          ListEmptyComponent={<EmptyArray message={"Add Some Trips"}/>}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          style={tw`mx-4`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('TripExpenses')}>
              <View style={tw`bg-white p-3 rounded-2xl mb-3 shadow-sm`}>
                <Image source={randomImage()} style={tw`w-33 h-33 rounded-lg mb-2`} />
                <Text style={tw`font-bold`}>{item.name}</Text>
                <Text style={tw`text-xs`}>{item.name2}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ADD TRIP MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}>
          <View style={tw`bg-white rounded-xl p-5 w-80`}>
            <Text style={tw`text-lg font-bold mb-4`}>Add a New Trip</Text>
            <TextInput
              placeholder="Trip Name"
              style={tw`border-b border-gray-300 p-2 mb-4`}
              value={newTripName}
              onChangeText={setNewTripName}
            />
            <TextInput
              placeholder="Location"
              style={tw`border-b border-gray-300 p-2 mb-4`}
              value={newTripLocation}
              onChangeText={setNewTripLocation}
            />
            <View style={tw`flex-row justify-between pt-4`}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`p-2 px-3 mr-2 bg-white border rounded-full border-gray-200`}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddTrip} style={tw`p-2 px-3 bg-blue-200 border rounded-full border-gray-200`}>
                <Text>Add Trip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
