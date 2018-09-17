import React from 'react';
import { StyleSheet, Text } from 'react-native';
import BottleList from './BottleList';
import { connect } from 'react-redux';

class Favorites extends React.Component {

    render() {
        return (
            <BottleList
                bottles={this.props.favoritesBottle}
                navigation={this.props.navigation}
                favoriteList={true}
                // Ici on est bien dans le cas de la liste des bouteilles favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de bouteilles après un scroll lorsqu'on est sur la vue Favoris.
            />
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
