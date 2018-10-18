import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, ScrollView, Text, TouchableOpacity, AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { getDataUser  } from '../API/TMDBApi';
const { width: WIDTH } = Dimensions.get('window')
class Profil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ""
    }

  }
  componentDidMount() {
   this.retrieveDataEmail;
    console.log("result")
    console.log(getDataUser())
  }

  retrieveDataEmail = async () => {
    let email;
    try {
      const value = await AsyncStorage.getItem('CurrentUserEmail');
      if (value !== null) {
        // We have data!!
        email = value;
      }
    } catch (error) {
      // Error retrieving data
      alert("erreurretrieve")
      console.log(error)
    }
    this.state.email=email;
  }
  

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View>
            <Text>email :{this.state.email}</Text>
            <Text>age :</Text>
            <Text>sexe :</Text>
            <TouchableOpacity style={styles.btnLogin} onPress={this.retrieveDataEmail}>
              <Text style={styles.text}>test</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.text}>second test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#432577',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 25
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default connect()(Profil)