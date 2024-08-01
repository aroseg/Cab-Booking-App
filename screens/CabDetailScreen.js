import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const CabDetailScreen = ({ route }) => {
  const { cabId } = route.params;
  const [cab, setCab] = useState(null);

  useEffect(() => {
    const fetchCabDetails = async () => {
      const cabDoc = doc(firestore, 'cabs', cabId);
      const docSnap = await getDoc(cabDoc);
      if (docSnap.exists()) {
        setCab(docSnap.data());
      }
    };

    fetchCabDetails();
  }, [cabId]);

  const handleBook = async () => {
    try {
      // Replace 'currentUserId' with the actual user ID
      const userId = 'currentUserId'; 
      const bookingsQuery = query(collection(firestore, 'myCabs'), where('userId', '==', userId));
      const querySnapshot = await getDocs(bookingsQuery);

      if (querySnapshot.size >= 2) {
        Alert.alert('Booking Limit Reached', 'You cannot book more than 2 cabs.');
        return;
      }

      // Save the booking information to Firestore
      const bookingRef = doc(firestore, 'myCabs', cabId);
      await setDoc(bookingRef, {
        ...cab,
        userId,
        bookedAt: new Date().toISOString()
      });

      Alert.alert('Cab Booked', `You have successfully booked ${cab.companyName}`);
    } catch (error) {
      Alert.alert('Error', 'Unable to book the cab.');
      console.error('Error booking cab: ', error);
    }
  };

  if (!cab) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cab.companyName}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Model:</Text>
        <Text style={styles.info}>{cab.carModel}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Passengers:</Text>
        <Text style={styles.info}>{cab.passengers}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Rating:</Text>
        <Text style={styles.info}>{cab.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Cost/hour:</Text>
        <Text style={styles.info}>${cab.cost}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBook}>
        <Text style={styles.buttonText}>Book Cab</Text>
      </TouchableOpacity>
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
  infoContainer: {
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CabDetailScreen;
