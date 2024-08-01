import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';

const HomeScreen = ({ navigation }) => {
  const [cabs, setCabs] = useState([]);

  useEffect(() => {
    const cabsCollection = collection(firestore, 'cabs');
    const unsubscribe = onSnapshot(cabsCollection, (snapshot) => {
      const cabData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCabs(cabData);
    });

    return () => unsubscribe();
  }, []);

  const renderCabItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cabItem}
      onPress={() => navigation.navigate('CabDetail', { cabId: item.id })}
    >
      <View style={styles.cabInfo}>
        <Text style={styles.companyName}>{item.companyName}</Text>
        <Text style={styles.carModel}>{item.carModel}</Text>
      </View>
      <Button
        title="View Details"
        onPress={() => navigation.navigate('CabDetail', { cabId: item.id })}
        color="#007BFF"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Cabs</Text>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={renderCabItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  cabItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2, // For shadow effect on Android
    shadowColor: '#000', // Shadow effect on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cabInfo: {
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carModel: {
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;
