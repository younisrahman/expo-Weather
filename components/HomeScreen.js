import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, Card, List, Title } from 'react-native-paper';

import MyHeader from './MyHeader';
var Mcity = 'Dhaka';
export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
  }
  state={
    info:{
      name: "loading",
      temp: "loading",
      humidity: "loading",
      desc: "loading",
      icon: "loading",
      temp_max: "loading",
      temp_min: "loading",
      pressure: "loading",
      winddeg: "loading",
      windspeed: "loading",
    }
  }

  async getWeather (){
    Mycity = await AsyncStorage.getItem("mycity");
    if (Mycity != null){
      Mcity=Mycity;
      console.log(Mycity);
    }
    //console.log(Mycity);
    // let Mycity = "london"
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${Mcity}&units=metric&APPID=e5f28d9345a2d209653732af91713a12`)
    .then(res => res.json())
    .then(data =>{
      console.log(data)
      this.setState({
        info:{
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          pressure: data.main.pressure,
          winddeg: data.wind.deg,
          windspeed: data.wind.speed,
        }
      })
    }).catch(err =>{
      Alert.alert("Error" + err.message+"please connect to internet",[{text:"ok"}])
    })
  }

  componentDidMount(){
    this.getWeather()
  }

  render() {
    //const {city} = this.props.route.params
    //var mycity = this.props.route.params('city', 'Dhaka')
    
    if (typeof this.props.route.params === 'undefined'){
      //console.log(this.props.route.params)
      
    }
    else{
      //console.log(this.props.route.params)
      const {city} = this.props.route.params
      Mcity = city;
      this.getWeather()
      console.log("this is My city",Mcity);
    }
    return (
      <View style={styles.container}>
        <MyHeader title="Current Weather" />
        <Card style={{margin:20}}>
          <LinearGradient
          colors={['#021879','#0575e6', '#4267B2']}
          >
            <View style={{padding:20,alignItems:"center"}}>
              <Title style={styles.text}>{this.state.info.name}</Title>
              <Image style={{width:120,height:120}}
                source={{uri:'http://openweathermap.org/img/w/'+this.state.info.icon+'.png'}}/>
              <Title style={styles.text}>TEMPERATURE : {this.state.info.temp}</Title>
              <Title style={styles.text}>TEMPERATURE MAX : {this.state.info.temp_max}</Title>
              <Title style={styles.text}>TEMPERATURE MIN : {this.state.info.temp_min}</Title>
              <Title style={styles.text}>DESCRIPTION : {this.state.info.desc}</Title>
              <Title style={styles.text}>HUMIDITY : {this.state.info.humidity}</Title>
              <Title style={styles.text}>WIND SPEED : {this.state.info.windspeed}</Title>
              <Title style={styles.text}>WIND ANGLE : {this.state.info.winddeg}</Title>
              <Title style={styles.text}>PRESSURE : {this.state.info.pressure}</Title>
            </View>

          </LinearGradient>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  text:{
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
    fontSize: 22
  }
});
