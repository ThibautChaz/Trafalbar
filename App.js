import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux';
import Store from './Store/configureStore';
import Login from './Components/Login';
import Inscription from './Components/Inscription';
import firebase from 'firebase';

export default class App extends React.Component {

	componentDidMount() {
		// var config = {
		// 	apiKey: "AIzaSyBgKiwt3_pFKP8Dh-9QwQyqdVx85qzwpWo",
		// 	authDomain: "trafalbar.firebaseapp.com",
		// 	databaseURL: "https://trafalbar.firebaseio.com",
		// 	projectId: "trafalbar",
		// 	storageBucket: "trafalbar.appspot.com",
		// 	messagingSenderId: "384693289045"
		// };
		// firebase.initializeApp(config);
		// // firebase.database().ref('user-list/002').set(
		// // 	{
		// // 		name: 'didier blanc',
		// // 		age: 21
		// // 	}
		// // ).then(() => {
		// // 	console.log('Insert')
		// // }).catch((error) => {
		// // 	console.log(error);
		// // })

		// firebase.database().ref('bouteille-list').once('value', (data) => {
		// 	console.log(data.toJSON());
		// })

	}

	

	render() {
		return (
			// Le component Provider n'a qu'une seule et unique fonction, 
			// il distribue votre store à toute votre application.
			<Provider store={Store}>
				<Navigation />
			</Provider>
			//<Login />
			//<Inscription/>
		);
	}
}

