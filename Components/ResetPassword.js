import React, { Component } from 'react';
import {
	Platform, StyleSheet, Text, TouchableWithoutFeedback, StatusBar, TextInput, View, ImageBackground, Image, Dimensions,
	SafeAreaView, Keyboard, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import bgImage from '../Images/background.jpg';
import logo from '../Images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import firebase from 'firebase';

const { width: WIDTH } = Dimensions.get('window')

class ResetPassword extends Component {

	constructor(props) {
		super(props);
		
		
		this.state = {
			email: "",
		}
	}

	componentDidMount() {
	
	
		  
	}

    resetPassword = () => {
		const { email } = this.state;


        var auth = firebase.auth();
		emailAddress = email;

	
        auth.sendPasswordResetEmail(emailAddress).then(function() {
		
           alert("email envoyé")
        }).catch(function(error) {
			alert("erreur")
			
		});
		this.props.navigation.navigate('Login');
    }

	render() {
		return (
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
				<SafeAreaView style={{ flex: 1 }}>
					<StatusBar barStyle="light-content" />
					<KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
							<View>
								<View style={styles.logoContainer}>
									<Image source={logo} style={styles.logo} />
									<Text style={styles.logoText}>Rhum Collection</Text>
								</View>

								<View style={styles.inputContainer}>
									<Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'}
										style={styles.inputIcon} />
									<TextInput
										style={styles.input}
										placeholder={'Enter Email adress'}
										placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
										keyboardType={'email-address'}
										returnKeyType='next'
										autoCorrect={false}
										underlineColorAndroid='transparent'
										onChangeText={(value) => this.setState({ email: value })}
									/>
								</View>

								<TouchableOpacity style={styles.btnLogin} onPress={this.resetPassword}>
									<Text style={styles.text}>Récuperer mon mot de passe</Text>
								</TouchableOpacity>
							
							</View>
						</TouchableWithoutFeedback>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoContainer: {
		alignItems: 'center',
		marginTop: '25%',
		marginBottom: 50
	},
	labelResetPassword:{
		color: 'purple',
		fontSize: 15,
		fontStyle: 'italic',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center'
	},
	btnResetPass: {
		width: WIDTH - 55,
		height: 45,
		justifyContent: 'center',
	},
	logo: {
		width: 120,
		height: 120
	},
	logoText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '500',
		marginTop: 10,
		opacity: 0.8,
	},
	inputContainer: {
		marginTop: 10,
		marginBottom: 15,
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'rgba(0, 0, 0, 0.35)',
		color: 'rgba(255, 255, 255, 0.7)',
		marginHorizontal: 25
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37
	},
	btnEye: {
		position: 'absolute',
		top: 8,
		right: 37
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
	text: {
		color: 'rgba(255, 255, 255, 0.7)',
		fontSize: 16,
		textAlign: 'center'
	},
});

export default connect()(ResetPassword);
