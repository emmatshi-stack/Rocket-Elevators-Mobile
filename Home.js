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
  StyleSheet, 
  FlatList,
  TouchableOpacity, 
  SafeAreaView } from 'react-native';
  import Constants from 'expo-constants';

  export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.navigation = props.navigation;
        this.currentemploye = props.route.params.employe;
        this.state = {
            selected: new Map(),
            loading: true,
            data:[]
        };
       
        
          
    }
    onSelect(obj, scope){
        const newSelected = new Map();
        newSelected.set(obj.id, !scope.state.selected.get(obj.id));
  
        scope.setState({selected: newSelected});
        scope.navigation.navigate('Status', {elevator:obj, employe:scope.currentemploye })
    }

    getInactiveElevators() {

      this.inactiveElevatordata = [];
      fetch('https://rocketapiem.herokuapp.com/Elevators/inactive', {
        
        headers:{
        'Access-Control-Allow-Origin':''
        }
      })
      .then((response) => {
          return response.json();                
      })
      .then(data => {
          this.inactiveElevatordata = data; 
          this.setState({data, loading: false})
          console.log(this.employeedata)
      }).catch(error => {
          console.log(error);
      });
    }

    

    render() {
      this.getInactiveElevators();
      if(this.state.loading) {
        return <Text style={styles.person} > 
                {"Loading ... "}

              </Text>
      } 
      return this.renderElt();
    }

    renderElt(data) {
      return(
        <SafeAreaView style={styles.container}>
          <View>
          <Button title="Log out" onPress={() => this.navigation.navigate('Login')} />
          </View>
          <Text style={styles.welcomeTxt} > 
              {"Welcome "+ this.currentemploye.firstName + ' ' + this.currentemploye.lastName}
            </Text>
            <Text style={styles.listTxt} > 
              {" List of inactive elevators"}
            </Text>
            <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                <ElevatorRow
                    id={item.id}
                    title={item.typeBuilding}
                    status={item.status}
                    information={item.serialNumber}
                    selected={!!this.state.selected.get(item.id)}
                    onSelect={this.onSelect}
                    scope={this}
                />
                )}
                keyExtractor={item => item.id}
                extraData={this.state.selected}
            />                
        </SafeAreaView>
       );
    }

}
function ElevatorRow({ id, title, status, information, selected, onSelect, scope }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect({ id, title, status, information }, scope)}
        style={[
          styles.item,
          { backgroundColor: selected ? 'blue' : 'red' },
        ]}
      >
        <Text style={styles.title}>{"- typeBuilding: "+title + " - status: " +status +  " - serialNumber: " +information}</Text>
      </TouchableOpacity>
    );
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 18,
      color: 'white',
    },
    welcomeTxt: {
      width: 300,
      height: 44,
      padding: 2,
      color: "blue",
      marginBottom: 5,
      fontSize: 12,     
      marginTop: 20,
      fontSize: 20,
      textAlign: 'center',

    },
    listTxt: {
      width: 300,
      height: 44,
      textAlign: 'center',
      
      marginBottom: 10,
      fontSize: 20,       
      
      
    },
    containerText: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    }
  });