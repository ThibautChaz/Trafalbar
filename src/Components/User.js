export default class User {

	constructor(props) {
		super(props);

		this.state = {
			email = "",
			age = "",
			sexe = "",
			credential = {
				login,
				password,
			}
		}
	}
	getEmail() {
		return this.props._email;
	}
	setEmail(email) {
		this.props._email = email;
	}
}