import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import BottleList from './BottleList';
import { getBottlesFromApiWithSearchedText, getBottlesFromApi, deconnexionUser } from '../API/TMDBApi';
import firebase from 'firebase';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.searchedText = "";
        // this.page = 0;
        // this.totalPages = 0

        this.state = {
            bottles: [],
            isLoading: false
        }
        this._loadBottles = this._loadBottles.bind(this)

    }
    signOut = () => {
        firebase.auth().signOut()
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this._searchBottles();
    }

    _loadBottles() {
        // if (this.searchedText.length > 0) {
        //     this.setState({ isLoading: true })
        //     getBottlesFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
        //         this.page = data.page;
        //         this.totalPages = data.total_pages;
        //         this.setState({
        //             bottles: [...this.state.bottles, ...data.results],
        //             //Autre syntax : bottles: this.state.bottles.concat(data.results)
        //             isLoading: false
        //         });
        //     });
        // }

        function _norm(obj) {
            return Object.keys(obj).map(key => { obj[key].label = key; return obj[key]; });
        }
        // function _norm(obj) {

        //     return Object.keys(obj).map(key => { obj[key] = key; return key; });
        // }
        
        getBottlesFromApi((err, data) => {
            if (err) {
                return console.error(err);
            }

            
            this.setState({bottles: []})
            // var bottlesFromData = [];
            // bottlesFromData.push(_norm(data));
            
            this.setState({
                //bottles: this.state.bottles.concat(bottlesFromData)
                bottles: this.state.bottles.concat(_norm(data))
            })            
        });
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchBottles() {

        // this.page = 0;
        // this.totalPages = 0;
        this.setState({
            bottles: []
        }, () => {
            this._loadBottles()
        })

    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }
//   <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._searchBottles()} />
//   <Button style={{ height: 50 }} title='Deconnexion' onPress={() => this.signOut()} />

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre de la bouteille'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchBottles()}
                />
            
                {/* {console.log(this.state.bottles)} */}
                <BottleList
                    bottles={this.state.bottles}// C'est bien le component Search qui récupère les bouteilles depuis l'API et on les transmet ici pour que le component BottleList les affiche
                    navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component BottleList de naviguer vers le détail d'une bouteille
                    loadBottles={this._loadBottles} // _loadBottles charge les bouteilles suivantes, ça concerne l'API, le component BottleList va juste appeler cette méthode quand l'utilisateur aura parcouru toutes les bouteilles et c'est le component Search qui lui fournira les bouteilles suivantes
                    page={this.page}
                    totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component BottleList, pour ne pas déclencher l'évènement pour charger plus de bouteille si on a atteint la dernière page
                    favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des bouteilles favoris. Et ainsi pouvoir déclencher le chargement de plus de bouteilles lorsque l'utilisateur scrolle.
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search