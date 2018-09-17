import React, { Component } from 'react';
import {
	Platform, StyleSheet, Text, TouchableWithoutFeedback, StatusBar, TextInput, View, ImageBackground, Image, Dimensions,
	SafeAreaView, Keyboard, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import bgImage from '../Images/background.jpg';
import logo from '../Images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { connexionUsers } from '../API/TMDBApi';
import { connect } from 'react-redux';

const { width: WIDTH } = Dimensions.get('window')
class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			press: false,
			email: "",
			password: ""
		}
	}

	componentDidMount() {
		// axios("127.0.0.1")
		// 	.then(data => console.log(data))
	}

	showPass = () => {
		if (this.state.press == false) {
			this.setState({
				showPass: false,
				press: true
			});
		} else {
			this.setState({
				showPass: true,
				press: false
			});
		}
	}

	login = () => {
		
		const { email, password } = this.state;

		connexionUser(email, password);
		
		alert('Connexion..')
		
	}

	goToInsciption = () => {
		this.props.navigation.navigate('Inscription');
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
										placeholder={'Enter Username/Email'}
										placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
										keyboardType={'email-address'}
										returnKeyType='next'
										autoCorrect={false}
										underlineColorAndroid='transparent'
										onSubmitEditing={() => this.refs.txtPassword.focus()}
										onChangeText={(value) => this.setState({ email: value })}
									/>
								</View>

								<View style={styles.inputContainer}>
									<Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'}
										style={styles.inputIcon} />
									<TextInput
										style={styles.input}
										placeholder={'Password'}
										secureTextEntry={this.state.showPass}
										placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
										underlineColorAndroid='transparent'
										autoCorrect={false}
										ref={"txtPassword"}
										onChangeText={(value) => this.setState({ password: value })}
									/>

									<TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
										<Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255, 255, 255, 0.7)'} />
									</TouchableOpacity>

								</View>

								<TouchableOpacity style={styles.btnResetPass}>
									<Text style={styles.labelResetPassword}>mot de passe oublié</Text>
								</TouchableOpacity>
							
								<TouchableOpacity style={styles.btnLogin} onPress={this.login}>
									<Text style={styles.text}>Login</Text>
								</TouchableOpacity>

								<TouchableOpacity style={styles.btnLogin} onPress={this.goToInsciption}>
									<Text style={styles.text}>Pas encore inscrit ? Inscrivez-vous</Text>
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

export default connect()(Login);
