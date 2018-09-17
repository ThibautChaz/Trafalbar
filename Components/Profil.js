import React, { Component } from 'react';
import {
	Platform, StyleSheet, Text,  TextInput, View,   Dimensions,
	 ScrollView, Switch
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements'

import BaseIcon from '../base-icon/Icon'
import Chevron from '../chevron/Chevron'
import InfoText from '../infotext/InfoText'


const { width: WIDTH } = Dimensions.get('window')
class Profil extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
             
	        <ScrollView style={styles.scroll}>
                <View style={styles.userRow}>
                  <View>
                    <Text style={{ fontSize: 16 }}>UID</Text>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 16,
                      }}
                    >
                      EMAIL
                    </Text>
                  </View>
                </View>

                <InfoText text="Account" />
                
			</ScrollView>
		);
	}
}


const styles = StyleSheet.create({

    scroll: {
        backgroundColor: 'white',
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
});

export default connect()(Profil)