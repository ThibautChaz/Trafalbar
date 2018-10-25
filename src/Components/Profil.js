import React, { Component } from 'react';
import {
  StyleSheet, View, Dimensions, ScrollView, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getDataUser } from '../API/TMDBApi';
const { width: WIDTH } = Dimensions.get('window')
class Profil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      age: 0,
      sexe: ""
    }
    console.ignoredYellowBox = [
			'Setting a timer'
		];
  }

  componentDidMount() {
    this.getEmail();
    console.log("checkpoint")

  }
  getEmail = async () => {

    var data;
    var email;
    var age;
    var sexe;

    await getDataUser().then((res) => {
      var result;
      result = JSON.stringify(res);
      data = JSON.parse(result);
    })
    email = data.email;
    age = data.age;
    sexe = data.sexe;

    this.setState({
      email: email,
      age: age,
      sexe: sexe
    });
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.userRow}>
          <View>
            <Text style={styles.text}>email :{this.state.email}</Text>
            <Text>age :{this.state.age}</Text>
            <Text>sexe :{this.state.sexe}</Text>
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
    marginTop: 200,
  },
});

export default connect()(Profil)