import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from './assets/icon.png'
import { 
  Image, 
  Alert, 
  Button, 
  TextInput, 
  View, 
  Text,
  TouchableHighlight,
  StyleSheet,
  ImageBackground } from 'react-native';


export default class Login extends Component {

    
    constructor(props) {
      console.log(props)
        super(props);
        this.navigation = props.navigation;
        this.state = {
            email: '',
            password: '',
            isInvalid:false,
            isEmailValideFormat: true,
            isDisabled: false
        };
       // this.fetchEmployee()
    }

    onSubmit() {
      const { email, password } = this.state;
      var employe = {};
      
      
      console.log("provided credentials: "+ email);
      
      fetch('https://rocketapiem.herokuapp.com/employees/'+email
      , {
        
        headers:{
        'Access-Control-Allow-Origin': ""
        }
        //'https://rocketapiem.herokuapp.com/employees
      })
      .then((response) => {
        console.log(response)
          return response.json();                
      })
      .then(data => {
          console.log(data);
          this.employeedata = data; 
          console.log(this.employeedata)

          if(this.employeedata.email)
          {
              this.setState({ isInvalid: false })
              this.navigation.navigate('Welcome',{
                employe: this.employeedata
                
              })
          } else {
            this.setState({ isInvalid: true })
          }
          console.log('Credentials', `${email} + ${password}`);



      }).catch(error => {
          console.log(error);
      });

  }

  validate(props) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      
      if (reg.test(props.email) === false) {
          this.setState({ isEmailValideFormat: false, email: props.email, isDisabled: false })
          return false;
      }
      else {
          this.setState({ isEmailValideFormat: true, email: props.email, isDisabled:true })
      }
  }
  
  render() {
      return (
        <View style={styles.container}>
          
          <ImageBackground source={require('./assets/corporate_serv2.jpg')} style={styles.backgd}>
                  <View style={styles.container1}>
                    <TextInput
                        value={this.state.email}
                        onChangeText={(email) => this.validate({email})}
                        placeholder={'Enter an email'}
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        style={styles.input}
                    />
                    <Text style={this.state.isEmailValideFormat? styles.loginText :  styles.loginWarning }>
                        Email invalid
                    </Text>
                    <Text
                      style={this.state.isInvalid? styles.loginWarning :  styles.loginText }
                    >
                      Your email or password is not valid
                    </Text>
                    
                  </View>
                  
              </ImageBackground>
          

            
  
            <Button
              disabled = {!this.state.isDisabled}
              title={'Login'}
              style={styles.input}
                onPress={() =>  this.onSubmit()}
            />       
  
        </View>
  
      );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
     backgroundColor: "white"
  },
  loginWarning:{
    display:'flex',
    margin: 10,
    width: 200,
    height: 24,
    color: 'red',
    textAlign: 'center',
    backgroundColor: "white"
},
loginText:{
  display:'none'
},
backgd: {
  flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
}
});