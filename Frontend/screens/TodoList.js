import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../actions/todoActions';

export default function TodoList() {
  const navigation = useNavigation();
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => dispatch(toggleTodo(index))}>
              <Text
                style={[
                  styles.todoText,
                  { textDecorationLine: item.completed ? 'line-through' : 'none' },
                ]}
              >
                {item.name}
              </Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => dispatch(removeTodo(index))}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        title="Add Todo"
        onPress={() => navigation.navigate('AddTodo')}
        color="#007bff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff', // Darker blue text color for header
    marginBottom: 20,
  },
  todoItem: {
    backgroundColor: '#e0f7ff', // Soft blue background for each todo item
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  todoText: {
    fontSize: 18,
    color: '#005f9e', // Blue color for the todo text
  },
  todoDescription: {
    fontSize: 14,
    color: '#6a9ebf', // Lighter blue color for the description text
  },
  removeButton: {
    backgroundColor: '#ff6b6b', // Red color for remove button
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12, // Smaller text for remove button
  },
});
