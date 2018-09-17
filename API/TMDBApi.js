import firebase from 'firebase';

const API_TOKEN = "3bcbfa45fb18f96119e4f24cadb9f4fa";

const config = {
    apiKey: "AIzaSyBgKiwt3_pFKP8Dh-9QwQyqdVx85qzwpWo",
    authDomain: "trafalbar.firebaseapp.com",
    databaseURL: "https://trafalbar.firebaseio.com",
    projectId: "trafalbar",
    storageBucket: "trafalbar.appspot.com",
    messagingSenderId: "384693289045"
};
const firebaseApp = firebase.initializeApp(config);
const storageRef = firebase.storage().ref();
const bottleListRef = firebaseApp.database().ref('bouteille-list');

export function getBottlesFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query='
        + text + "&page+" + page

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

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

export function connexionUser(email, password) {
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      

}

export function inscriptionUser(email, password) {

    const result = firebase.auth().createUserWithEmailAndPassword(email, password)


    .then(function(){
        return result;
    })
    .catch(function(error) {

        var errorCode = error.code;

        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Mauvais mot de passe.');
          } else {
            alert(errorMessage);
          }
        

    })
    
        
}

export function deconnexionUser() {
    return firebase.auth().signOut()
        .then(data => console.log(data))
        .catch(error => console.log(error))
}