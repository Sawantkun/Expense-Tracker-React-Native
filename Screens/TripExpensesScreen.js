import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Modal, TextInput, ScrollView } from 'react-native';
import tw from 'twrnc';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../themes/index';
import EmptyArray from '../components/EmptyArray';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ExpenseCard from '../components/ExpenseCard';
import Tag from '../components/TagInput'; // Import the Tag component
import hero from "../assets/Images/7.png"

const CATEGORIES = ['food', 'shopping', 'entertainment','borrowed', 'travel', 'miscelleneous']; // Example categories

export default function TripExpensesScreen() {
  const [trips, setTrips] = useState([
    { id: '1', title: 'Ate Sandwich', category: 'food', amount: 50 },
    { id: '2', title: 'Bought Hoodie', category: 'shopping', amount: 50 },
    { id: '3', title: 'Watch Movie', category: 'entertainment', amount: 50 },
  ]);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [newTripName, setNewTripName] = useState('');
  const [newCategory, setNewCategory] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateAmount, setUpdateAmount] = useState('');

  const handleAddTrip = () => {
    if (newTripName && newCategory && newAmount) {
      const newTrip = {
        id: (trips.length + 1).toString(),
        title: newTripName,
        category: newCategory,
        amount: parseFloat(newAmount),
      };
      setTrips([...trips, newTrip]);
      setAddModalVisible(false);
      setNewTripName('');
      setNewCategory(null);
      setNewAmount('');
    }
  };

  const handleOpenUpdateModal = (item) => {
    setSelectedTrip(item);
    setUpdateTitle(item.title);
    setUpdateCategory(item.category);
    setUpdateAmount(item.amount.toString());
    setUpdateModalVisible(true);
  };

  const handleUpdateTrip = () => {
    if (selectedTrip && updateTitle && updateCategory && updateAmount) {
      const updatedTrips = trips.map((trip) =>
        trip.id === selectedTrip.id
          ? { ...trip, title: updateTitle, category: updateCategory, amount: parseFloat(updateAmount) }
          : trip
      );
      setTrips(updatedTrips);
      setUpdateModalVisible(false);
      setSelectedTrip(null);
      setUpdateTitle('');
      setUpdateCategory('');
      setUpdateAmount('');
    }
  };

  const handleDeleteTrip = () => {
    if (selectedTrip) {
      const updatedTrips = trips.filter((trip) => trip.id !== selectedTrip.id);
      setTrips(updatedTrips);
      setUpdateModalVisible(false);
      setSelectedTrip(null);
    }
  };

  const navigation = useNavigation();
  return (
    <ScreenWrapper title="Home" style={tw`flex-1`}>
      {/* HERO SECTION */}
      <View style={tw`relative p-4`}>
        <TouchableOpacity style={tw`bg-white rounded-full p-1 absolute top-4 left-4`} onPress={() => navigation.navigate('Home')}>
          <Icon name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={tw`text-xl shadow-sm font-bold text-center w-full`}>Expenses</Text>
      </View>
      <View style={tw`flex-row justify-center items-center rounded-xl mx-4`}>
        <Image source={hero} style={tw`w-80 h-45`} />
      </View>

      {/* TRIPS SECTION */}
      <View style={tw`flex-row justify-between items-center p-4`}>
        <Text style={[tw`text-xl shadow-sm font-bold`, { color: colors.heading.replace('text-', '#') }]}>
          Expenses
        </Text>
        <TouchableOpacity onPress={() => setAddModalVisible(true)} style={tw`p-2 px-3 bg-white border rounded-full border-gray-200 ${colors.button}`}>
          <Text style={tw`${colors.button}`}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 430 }}>
        <FlatList
          data={trips}
          ListEmptyComponent={<EmptyArray message={"Add Some Expenses"} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={tw`mx-4`}
          renderItem={({ item }) => (
            <ExpenseCard item={item} onPress={() => handleOpenUpdateModal(item)} />
          )}
        />
      </View>

      {/* ADD EXPENSE MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(!addModalVisible);
        }}
      >
        <View style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}>
          <View style={tw`bg-white rounded-xl p-5 w-80`}>
            <Text style={tw`text-lg font-bold mb-4`}>Add New Expense</Text>
            <TextInput
              placeholder="Title"
              style={tw`border-b border-gray-300 p-2 mb-4`}
              value={newTripName}
              onChangeText={setNewTripName}
            />
            <TextInput
              placeholder="Amount"
              style={tw`border-b border-gray-300 p-2 mb-4`}
              value={newAmount}
              onChangeText={setNewAmount}
              keyboardType="numeric"
            />
            <View horizontal style={tw` mb-4`}>
                <Text>Categories</Text>
                 <View style={tw`flex-row flex-wrap justify-evenly  py-2`}>
                 {CATEGORIES.map((cat) => (
                 <TouchableOpacity style={tw`my-1`}>
                <Tag
                  key={cat}
                  tag={cat}
                  isSelected={cat === newCategory}
                  onPress={() => setNewCategory(cat)}
                />
                 </TouchableOpacity>
                ))}
                 </View>
            </View>
            <View style={tw`flex-row justify-between pt-4`}>
              <TouchableOpacity onPress={() => setAddModalVisible(false)} style={tw`p-2 px-3 mr-2 bg-white border rounded-full border-gray-200 ${colors.button}`}>
                <Text style={tw`${colors.button}`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddTrip} style={tw`p-2 px-3 bg-blue-200 border rounded-full border-gray-200 ${colors.button}`}>
                <Text style={tw`${colors.button}`}>Add Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* UPDATE/DELETE EXPENSE MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => {
          setUpdateModalVisible(!updateModalVisible);
        }}
      >
        <View style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}>
          <View style={tw`bg-white rounded-xl p-5 w-80`}>
            <TouchableOpacity onPress={handleDeleteTrip} style={tw`absolute top-0 right-0 p-5`}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
            <Text style={tw`text-lg font-bold mb-4`}>Update Expense</Text>
            <TextInput
              placeholder="Title"
              style={tw`border-b border-gray-300 p-2 mb-4`}
              value={updateTitle}
              onChangeText={setUpdateTitle}
            />
            <TextInput
              placeholder="Amount"
              style={tw`border-b border-gray-300 p-2 mb-4`}
              value={updateAmount}
              onChangeText={setUpdateAmount}
              keyboardType="numeric"
            />
            <View horizontal style={tw` mb-4`}>
                <Text>Categories</Text>
                 <View style={tw`flex-row flex-wrap justify-evenly  py-2`}>
                 {CATEGORIES.map((cat) => (
                 <TouchableOpacity style={tw`my-1`}>
                <Tag
                  key={cat}
                  tag={cat}
                  isSelected={cat === updateCategory}
                  onPress={() => setUpdateCategory(cat)}
                />
                 </TouchableOpacity>
                ))}
                 </View>
            </View>
            <View style={tw`flex-row justify-between pt-4`}>
              <TouchableOpacity onPress={() => setUpdateModalVisible(false)} style={tw`p-2 px-3 mr-2 bg-white border rounded-full border-gray-200 ${colors.button}`}>
                <Text style={tw`${colors.button}`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateTrip} style={tw`p-2 px-3 bg-blue-200 border rounded-full border-gray-200 ${colors.button}`}>
                <Text style={tw`${colors.button}`}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
