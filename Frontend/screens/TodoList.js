import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos, removeTodo } from '../actions/todoActions';

export default function TodoList() {
  const navigation = useNavigation();
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3000/todos');
        const data = await response.json();
        dispatch(setTodos(data));
      } catch (error) {
        Alert.alert('Error', 'Failed to load todos');
      }
    };

    fetchTodos();
  }, []);

  const handleToggleTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}/toggle`, {
        method: 'PATCH',
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        dispatch(setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo))));
      } else {
        Alert.alert('Error', 'Failed to toggle todo');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle todo');
    }
  };

  const handleRemoveTodo = async (id) => {
    try {
      const response = await fetch(`http://your-server-address/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(removeTodo(id));
      } else {
        Alert.alert('Error', 'Failed to remove todo');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to remove todo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => handleToggleTodo(item._id)}>
              <Text
                style={[
                  styles.todoText,
                  { textDecorationLine: item.completed ? 'line-through' : 'none' },
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveTodo(item._id)}
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
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  todoItem: {
    backgroundColor: '#e0f7ff',
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
    color: '#005f9e',
  },
  todoDescription: {
    fontSize: 14,
    color: '#6a9ebf',
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});
