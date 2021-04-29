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



export default class ElevatorStatus extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.navigation = props.navigation;
        this.employe = props.route.params.employe;
        this.state = {
            statusInactif: false,
            status: '',
            elevator: props.route.params.elevator
        };
    }
    changeStatus(){
        this.updateElevatorStatus(this.getElevatorStatus)
    }

    updateElevatorStatus(callback) {

        var id = this.state.elevator.id;
  
        fetch('https://rocketapiem.herokuapp.com/Elevators/'+id+'/setStatus?status=Online',  {
            method: 'PUT',
            headers: new Headers({
                       'Content-Type': 'application/x-www-form-urlencoded', 
              })
          })
        .then((response) => {
            return response;                
        })
        .then(data => {
            callback(id,this)
        }).catch(error => {
            console.log(error);
        });
    }

    getElevatorStatus(id,scope){
  
        fetch('https://rocketapiem.herokuapp.com/Elevators/'+id+'/status',  {
            headers: new Headers({
                       'Content-Type': 'application/x-www-form-urlencoded', 
              })
          })
        .then((response) => {
            return response.text();                
        })
        .then(data => {
            console.log(data)
            console.log(scope)
            scope.state.elevator.status = data;
            scope.setState({ statusInactif: true })
        }).catch(error => {
            console.log(error);
        });

    }

    
    displayButton(){
        if(this.state.elevator.status == "Offline") {
            return  <Button title="Elevator Status"style={styles.butonstatus}  onPress={() => this.changeStatus()} />
        }
        return  <Button title="Back to Home Screen"
                        style={styles.butonstatus}
                         onPress={() => this.navigation.navigate('Welcome',{
                                                         employe: this.employe
                                                        })}
                 />
    }
    render() {
        return (
            <View style={styles.container}>                
                <Text
                    style={this.state.elevator.status == "Offline"? styles.inactif :  styles.actif }
                    >
                    {"Status is: "+this.state.elevator.status}
                </Text>
                {this.displayButton()}          
                
            </View>                  
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 10,
      marginBottom: 35,
    },
    inputContainer: {
      width: 200,
      height: 44,
      padding: 5,
      borderWidth: 1,
      borderColor: 'black',
      
    },

    inactif:{
        backgroundColor: "red",
        marginBottom: 20,
        width: 300,
        height: 50,
        textAlign: 'center',
        padding: 13,
        fontSize: 20,
        
    },
    actif:{
        backgroundColor: "green",
        marginBottom: 20,
        width: 300,
        height: 50,
        textAlign: 'center',
        padding: 13,
        fontSize: 20,
    },
    butonstatus:{
        margin: 100,
    }

    
  });