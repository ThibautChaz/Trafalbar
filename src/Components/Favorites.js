import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import BottleList from './BottleList';
import { connect } from 'react-redux';
import { deconnexionUser } from '../API/TMDBApi';

class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount() {
       
    }
    deconnexion = () => {
        deconnexionUser();
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={this.deconnexion}>
                    <Text>deconnexion(test)</Text>
                </TouchableOpacity>
                <BottleList
                    bottles={this.props.favoritesBottle}
                    navigation={this.props.navigation}
                    favoriteList={true}
                // Ici on est bien dans le cas de la liste des bouteilles favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de bouteilles après un scroll lorsqu'on est sur la vue Favoris.
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
    return {
        favoritesBottle: state.favoritesBottle
    }
}

export default connect(mapStateToProps)(Favorites);
