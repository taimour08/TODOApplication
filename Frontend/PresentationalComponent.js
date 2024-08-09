import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// this component is taking props as input. 

const PresentationalComponent = (props) => {
   return (
      <View>
         <Text style={styles.myState}>
            {props.myState}
         </Text>
      </View>
   );
};

export default PresentationalComponent;


const styles = StyleSheet.create({  // style-sheet allows you to define your styles in a structured way.
   myState: { // this specifically is for the mystate state.
      marginTop: 20,
      textAlign: 'center',
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 20,
   },
});
