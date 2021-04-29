import 'react-native-gesture-handler';
//import React from 'react';
//import { Image, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { 
  Image, 
  Alert, 
  Button, 
  TextInput, 
  View, 
  Text,
  TouchableHighlight,
  StyleSheet } from 'react-native';

import Login from './Login.js'
import HomeScreen from './Home.js'
import ElevatorStatus from './ElevatorsStatus.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import logo from './assets/R2.png'



const Stack = createStackNavigator();
export default class App extends Component {
 
  

  constructor(props){
    super(props);

  }

  render() {
    return (
      <View style={styles.container}> 
       
      <NavigationContainer>
        <Stack.Navigator>
           
          <Stack.Screen 
            name="Login"
            component={Login}

            options={{
              headerRight: () => (
                // <Image  style={styles.logo}
                //         source={{uri:logo}} 
                // /> 
                <Image style={styles.logo} source={require('./assets/R2.png')}/>
              ),
            }}
          
          />
          <Stack.Screen 
            name="Welcome" 
            component={HomeScreen} 
            options={{
              headerRight: () => (
                // <Image  style={styles.logo}
                //         source={{uri:logo}} 
                // /> 
                <Image style={styles.logo} source={require('./assets/R2.png')}/>
                ),
              }}
          /> 
          <Stack.Screen 
            name="Status" 
            component={ElevatorStatus}
            options={{
              headerRight: () => (
                // <Image  style={styles.logo}
                //         source={{uri:logo}} 
                // /> 
                <Image style={styles.logo} source={require('./assets/R2.png')}/>
                ),
              }}
          />        
         
        </Stack.Navigator>
      </NavigationContainer>
      </View>
      

    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    height:'100%'
  },
  logo: {
    margin:10,
    width:180,
    height:50
  }
});