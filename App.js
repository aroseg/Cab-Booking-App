import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CabDetailScreen from './screens/CabDetailScreen';
import MyCabsScreen from './screens/MyCabsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CabsList" component={HomeScreen} options={{ title: 'Cabs List' }} />
      <Stack.Screen name="CabDetail" component={CabDetailScreen} options={{ title: 'Cab Details' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'MyCabsTab') {
              iconName = focused ? 'car-sport' : 'car-sport-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="MyCabsTab" component={MyCabsScreen} options={{ title: 'My Cabs' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
