import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import TodoList from './screens/TodoList';
import AddTodo from './screens/AddTodo';
import store from './store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TodoList" component={TodoList} />
          <Stack.Screen name="AddTodo" component={AddTodo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
