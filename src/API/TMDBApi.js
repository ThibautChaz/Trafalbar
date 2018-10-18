import firebase from 'firebase';
import { AsyncStorage } from "react-native"

const API_TOKEN = "3bcbfa45fb18f96119e4f24cadb9f4fa";

const config = {
    apiKey: "AIzaSyBgKiwt3_pFKP8Dh-9QwQyqdVx85qzwpWo",
    authDomain: "trafalbar.firebaseapp.com",
    databaseURL: "https://trafalbar.firebaseio.com",
    projectId: "trafalbar",
    storageBucket: "trafalbar.appspot.com",
    messagingSenderId: "384693289045"
};


if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(config);
}

const storageRef = firebase.storage().ref();
const bottleListRef = firebaseApp.database().ref('bouteille-list');

export function getUrlFromStorage(name) {
    return storageRef.child(name).getDownloadURL();

}

export function getBottleDetailFromApi(callbackFn, id) {
    return firebaseApp.database().ref('bouteille-list/' + id).on(
        'value',
        data => callbackFn(null, data.toJSON()),
        err => callbackFn(err)
    )
}

export function getBottlesFromApi(callbackFn) {
    return bottleListRef.once(
        'value',
        data => callbackFn(null, data.toJSON()),
        err => callbackFn(err)
    );
}
export async function storeDataEmail(email) {

    try {
        await AsyncStorage.setItem('CurrentUserEmail', email);
    } catch (error) {
        alert("erreurtoredataemail")
        console.log(error)
    }
}


export async function connexionUser(email, password) {

    result = await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            if (!res) {
                return false;
            } else {
                let x = res.user;
                let email = x.email;
                storeDataEmail(email);
                return true;
            }
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Mauvais mot de passe.');
            } else {
                alert(errorMessage);
            }
            return false;
        });
    return result;
};

export async function resetPasswordWithEmail(email) {
    result = await firebase.auth().sendPasswordResetEmail(email).then(function () {

        alert("Email envoyé")
        return true;
    }).catch(function (error) {
        alert("Email inexistant")
        return false;
    });
    return result;

}

export async function inscriptionUser(email, age, sexe, password) {

    await firebase.auth().createUserWithEmailAndPassword(email, password)

        .then((res) => {

            if (res) {
                var user = res.user;
                var uid = user.uid;
                createUserInDb(uid, email, age, sexe);
            }
        })
        .catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorMessage);
        });


}
export function reAuthenticateUser() {

    var user = firebase.auth().currentUser;
    var credential;

    // Prompt the user to re-provide their sign-in credentials

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
        // User re-authenticated.
    }).catch(function (error) {
        // An error happened.
    });

}

export function userIsConnected() {
    var user = firebase.auth().currentUser;

    if (user) {
        return true;
    }
    else {
        return false;
    }

}
export async function getDataUser() {
    var usersRef = firebase.database().ref('UsersList');
    var user = firebase.auth().currentUser;

    if (user) {
        var test = await usersRef.child(user.uid).on('value', function (snapshot) {
            console.log("snapshot")
            console.log(snapshot)
            let x = snapshot;
           return x;
        })
    } else {
        alert("Vous n'êtes pas connecté")
    }
    return test;
}

export function createUserInDb(uid, email, age, sexe) {

    firebase.database().ref('UsersList/').child(uid).set({
        email,
        age,
        sexe
    }).then((data) => {
        //success callback
        console.log('datacreateuserdb')
    }).catch((error) => {
        //error callback
        console.log('errorcreateuserdb')
    })
}

export function deconnexionUser() {
    return firebase.auth().signOut()
        .then(() => {
            alert("user deconnecté")
        })
        .catch((error) => {

            alert("user deconnecté")
        })
}