import React, { Component } from 'react';
import {
	StyleSheet, Text, TouchableWithoutFeedback, StatusBar, TextInput, View, ImageBackground, Image, Dimensions,
	SafeAreaView, Keyboard, TouchableOpacity, KeyboardAvoidingView, ScrollView, Picker
} from 'react-native';
import bgImage from '../assets/images/background.jpg';
import logo from '../assets/images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { inscriptionUser } from '../API/TMDBApi';


const { width: WIDTH } = Dimensions.get('window')

class Inscription extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			press: false,
			email: "",
			age: 0,
			sexe: "homme",
			password: "",
			confirmPass: ""
		}
		console.ignoredYellowBox = [
			'Setting a timer'
		];
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

	goToLogin = () => {
		this.props.navigation.navigate('Login')
		/*var test = new User();
		truc = test.getEmail();
		console.log("truc");
		console.log(truc)*/
	}


	inscrip = () => {

		const { email, age, sexe, password, confirmPass } = this.state;

		if (password == confirmPass) {

			inscriptionUser(email, age, sexe, password);
			alert("Compte créé")
			this.goToLogin();
			
		} else {
			alert("Les mots de passe ne correspondent pas réessayez")
		}

	}

	onPickerValueChange = (value, index) => {
		this.setState(
			{
				sexe: value
			},
			(name, index) => {
				console.log("test");
				console.log(name);
				console.log(branches[index]);
			}
		);
	}

	render() {
		return (

			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
				<ScrollView>
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
										{/*<Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'}
											style={styles.inputIcon} />*/}
										<TextInput
											style={styles.input}
											placeholder={'Email'}
											placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
											keyboardType={'email-address'}
											returnKeyType='next'
											autoCorrect={false}
											underlineColorAndroid='transparent'
											onSubmitEditing={() => this.refs.txtAge.focus()}
											onChangeText={(value) => this.setState({ email: value })}
										/>
										<TextInput
											style={styles.input}
											placeholder={'Âge'}
											placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
											returnKeyType='next'
											autoCorrect={false}
											ref={"txtAge"}
											underlineColorAndroid='transparent'
											onSubmitEditing={() => this.refs.txtGenre.focus()}
											onChangeText={(value) => this.setState({ age: value })}
										/>
										<Picker
											style={styles.inputPicker}
											selectedValue={this.state.sexe}
											placeholder={'Genre'}
											placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
											autoCorrect={false}
											ref={"txtGenre"}
											onValueChange={(value) => { this.setState({ sexe: value }) }}>
											<Picker.Item label="Homme" value="homme" />
											<Picker.Item label="Femme" value="femme" />
										</Picker>



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
											onSubmitEditing={() => this.refs.txtPasswordConfirm.focus()}
											onChangeText={(value) => this.setState({ password: value })}
										/>

										<TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
											<Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255, 255, 255, 0.7)'} />
										</TouchableOpacity>

										<Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'}
											style={styles.inputIcon} />
										<TextInput
											style={styles.input}
											placeholder={'Confirm Password'}
											secureTextEntry={this.state.showPass}
											placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
											underlineColorAndroid='transparent'
											autoCorrect={false}
											ref={"txtPasswordConfirm"}
											onChangeText={(value) => this.setState({ confirmPass: value })}
										/>

										<TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
											<Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255, 255, 255, 0.7)'} />
										</TouchableOpacity>

									</View>

									<TouchableOpacity style={styles.btnLogin} onPress={this.inscrip}>
										<Text style={styles.text}>Inscription</Text>
									</TouchableOpacity>

									<TouchableOpacity style={styles.btnLogin} onPress={this.goToLogin}>
										<Text style={styles.text}>Déjà inscrit ? Connectez vous !</Text>
									</TouchableOpacity>
								</View>
							</TouchableWithoutFeedback>
						</KeyboardAvoidingView>
					</SafeAreaView>
				</ScrollView>
			</ImageBackground >

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
	inputPicker: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
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

export default connect()(Inscription)