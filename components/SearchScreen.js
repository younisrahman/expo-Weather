import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';

import { TextInput, Card, List, Button } from 'react-native-paper';

import MyHeader from './MyHeader';

export default class SearchScreen extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    text: '',
    cities:[]
  };

  async btnClick(){
    //console.log('Pressed!!')
    await AsyncStorage.setItem("mycity",this.state.text)
    this.props.navigation.navigate('Current City',{city:this.state.text})
  }
  async listClick(name){
    this.setState({text:name})
    await AsyncStorage.setItem("mycity",this.state.text)
    this.props.navigation.navigate('Current City',{city:this.state.text})
  }
  fetchCityName(text){

    this.setState({text})
    fetch(`http://autocomplete.wunderground.com/aq?query=${text}`)
    .then(data => data.json())
    .then( data2 =>{
      this.setState({
        cities:data2.RESULT.slice(0,9)
      })
    })
  }
  render() {
    rendercity= <Card><List.Item title="no city"/></Card>
    if (this.state.cities.length>0) {
      rendercity=this.state.cities.map(city=>{
        return(
          <Card style={{margin:5}} key={city.lat} onPress={()=> this.listClick(city.name)}>
            <List.Item title={city.name}/>
          </Card>
        )
      })
      
    }

    return (
      <View style={styles.container}>
        <MyHeader title="Select City"/>
        <TextInput
          label='City Name'
        value={this.state.text}
        onChangeText={text => this.fetchCityName(text)}
        />
        <Button style={{margin:10}} mode="contained" onPress={() => this.btnClick()}>
    Press me
  </Button>
       <ScrollView>
         {rendercity}
       </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});
