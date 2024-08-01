import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, doc, query, where, onSnapshot, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const MyCabsScreen = () => {
  const [bookedCabs, setBookedCabs] = useState([]);
  const currentUserId = 'currentUserId'; // Replace with actual user ID

  useEffect(() => {
    const fetchBookedCabs = async () => {
      // Query to get booked cabs for the current user
      const bookingsQuery = query(collection(firestore, 'myCabs'), where('userId', '==', currentUserId));
      
      // Use onSnapshot for real-time updates
      const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
        const bookedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookedCabs(bookedData);
      }, (error) => {
        console.error('Error fetching booked cabs: ', error);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    };

    fetchBookedCabs();
  }, [currentUserId]);

  const handleCancel = async (cabId) => {
    try {
      // Remove the cab booking from the Firestore collection
      const cabDoc = doc(firestore, 'myCabs', cabId);
      await deleteDoc(cabDoc);
      Alert.alert('Booking Cancelled', 'Your cab booking has been cancelled.');
    } catch (error) {
      Alert.alert('Error', 'Unable to cancel the booking.');
      console.error('Error cancelling cab booking: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Booked Cabs</Text>
      <FlatList
        data={bookedCabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cabContainer}>
            <Text style={styles.cabTitle}>{item.companyName}</Text>
            <Text>Model: {item.carModel}</Text>
            <Text>Passengers: {item.passengers}</Text>
            <Text>Rating: {item.rating}</Text>
            <Text>Cost/hour: ${item.cost}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleCancel(item.id)}>
              <Text style={styles.buttonText}>Cancel Booking</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cabContainer: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cabTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF4D4D',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyCabsScreen;
