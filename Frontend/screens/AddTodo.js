import React, { useState } from 'react';  // lets you add state to your functional components.
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; // allows you to dispatch actions to the Redux store.
import { addTodo } from '../actions/todoActions';

export default function AddTodo() {

  //State Management
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  
// This function is triggered when the user presses the "Add Todo" button. 
// It dispatches the addTodo action to the Redux store and then navigates back 
// to the previous screen (usually the Todo list screen).
  const handleAddTodo = () => { 
    dispatch(addTodo(name, description));
    navigation.goBack();
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
