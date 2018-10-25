import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import BottleItem from './BottleItem'
import { connect } from 'react-redux'

class BottleList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bottles: []
        }
        console.ignoredYellowBox = [
			'Setting a timer'
		];
    }

    _displayDetailForBottle = (idBottle) => {
        console.log("Display bouteille " + idBottle)
        // On a récupéré les informations de la navigation, on peut afficher le détail de la bouteille
        this.props.navigation.navigate('BottleDetail', { idBottle: idBottle })
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.bottles}
                keyExtractor={( item ) => item.id.toString()}
                renderItem={({ item }) => (
                    <BottleItem
                        bottle={item}
                        isBottleFavorite={(this.props.favoritesBottle.findIndex(bottle => bottle.id === item.id) !== -1) ? true : false}
                        // Bonus pour différencier les bouteilles déjà présente dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
                        displayDetailForBottle={this._displayDetailForBottle}
                    />
                )}
                onEndReachedThreshold={0.5}
                // onEndReached={() => {
                //     if (!this.props.favoriteList && this.props.bottles.length > 0/*&& this.props.page < this.props.totalPages*/) {
                //         // On appelle la méthode loadBottles du component Search pour charger plus de bouteilles
                //         this.props.loadBottles()
                //     }
                // }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})
// On connecte le store Redux, ainsi que les bouteilles favoris du state de notre application, à notre component BottleList
const mapStateToProps = state => {
    return {
        favoritesBottle: state.favoritesBottle
    }
}

export default connect(mapStateToProps)(BottleList)