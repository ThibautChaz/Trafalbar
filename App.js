import React from 'react';
import Navigation from './src/Service/Navigation/Navigation';
import { Provider } from 'react-redux';
import Store from './src/Service/Store/configureStore';
import Login from './src/Components/Login';
import Inscription from './src/Components/Inscription';

export default class App extends React.Component {

	componentDidMount() {
	
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

