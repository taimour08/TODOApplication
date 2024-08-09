import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function AddTodo() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [weather, setWeather] = useState('');
  const navigation = useNavigation();

  // Function to fetch weather data
  const fetchWeather = async () => {
    try {
      const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Tartu&appid=fc2dd765b55ad13fd78e622ee10ebf97&units=metric');
      const temperature = response.data.main.temp;
      setWeather(`Tartu: ${temperature} °C`);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather('Unable to fetch weather data');
    }
  };

  // Fetch weather data when the component mounts
  useEffect(() => {
    fetchWeather();
  }, []);

  // Handle adding a new todo
  const handleAddTodo = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: name, description }),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        const data = await response.json();
        Alert.alert('Error', data.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add todo');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add a New Todo</Text>
      <Text>{weather}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title="Add Todo"
        onPress={handleAddTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
