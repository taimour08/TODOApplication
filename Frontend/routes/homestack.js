import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';
import TodoList from '../screens/TodoList';
import AddTodo from '../screens/AddTodo';

const screens = {
  Home: {         // when I use 'the navigator to use this '
    screen: Home  // go here
  },
  ReviewDetails: {
    screen: ReviewDetails
  },
  TodoList: {
    screen: TodoList
  },
  AddTodo: {
    screen: AddTodo
  }
};

const HomeStack = createStackNavigator(screens);    // the screens involved in navigation

export default createAppContainer(HomeStack); // configuration is containerized can be used as component in other files <Navigation>
