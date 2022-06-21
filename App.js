import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput, Card, List } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';

const Tab = createBottomTabNavigator();
export default class App extends React.Component {
 
  render() {
    
    return (
      <View style={styles.container}>
        <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Current City') {
            iconName = 'md-cloud';
          } else if (route.name === 'Select City') {
            iconName = 'md-options';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#6200ee',
        inactiveBackgroundColor: '#6200ee',
      }}>
        <Tab.Screen name="Current City" component={HomeScreen} />
        <Tab.Screen name="Select City" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});
