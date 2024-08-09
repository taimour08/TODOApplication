import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddTodo() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

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
