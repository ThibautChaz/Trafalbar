import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import { getBottleDetailFromApi, getImageFromApi, getUrlFromStorage } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux';


class BottleDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bottle: null,
            isLoading: true,
            imgSrc: require('../Images/ic_image.png')
        }

        const favoriteBottleIndex = props.favoritesBottle.findIndex(item => item.id === props.navigation.state.params.idBottle)
        if (favoriteBottleIndex > -1) {
            this.state.bottle = props.favoritesBottle[favoriteBottleIndex];
            this.state.isLoading = false;
            this._getBottleImg();
        }
    }

    componentDidMount() {

        // const favoriteBottleIndex = this.props.favoritesBottle.findIndex(item => item.id === this.props.navigation.state.params.idBottle)
        // if (favoriteBottleIndex !== -1) {// Bouteille déjà dans nos favoris, on a déjà son détail
        //     // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
        //     this.setState({
        //         bottle: this.props.favoritesBottle[favoriteBottleIndex]
        //     })
        //     return
        // }
        if (this.state.isLoading) {
            getBottleDetailFromApi((err, data) => {
                if (err) {
                    return console.error(err);
                }
                this.setState({ bottle: data, isLoading: false })
                this._getBottleImg();
            }, this.props.navigation.state.params.idBottle);
        }
    }

    _getBottleImg() {
        const { bottle } = this.state;

        //If state is not yet updated :
        if (!bottle) {
            console.warn('Bottle not present in state, retrying later')
            setTimeout(this._getBottleImg.bind(this));
            return;
        }

        getUrlFromStorage(bottle.image)
            .then(url => this.setState({ imgSrc: { uri: url } }))
            .catch(err => console.error(err));
    }

    componentDidUpdate() {
        console.log("componentDidUpdate : ")
        console.log(this.props.favoritesBottle)
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

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.bottle }
        this.props.dispatch(action);
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoritesBottle.findIndex(item => item.id === this.state.bottle.id) !== -1) {
            sourceImage = require('../Images/ic_favorite.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        )
    }

    _displayBottle() {
        const { bottle, imgSrc } = this.state;
        if (bottle != undefined) {
            return (
                // <Text>{console.log(this.state.bottle)}</Text>
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={imgSrc}
                    />
                    <Text style={styles.title_text}>{bottle.nom}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => this._toggleFavorite()}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{bottle.description}</Text>
                    <Text style={styles.default_text}>Age : {bottle.age}</Text>
                    <Text style={styles.default_text}>Bouche : {bottle.bouche}</Text>
                    <Text style={styles.default_text}>Degres : {bottle.degres}</Text>
                    <Text style={styles.default_text}>finale : {bottle.finale}</Text>
                    <Text style={styles.default_text}>matieres premieres : {bottle.matiere_premiere}</Text>
                    <Text style={styles.default_text}>nez : {bottle.nez}</Text>
                    <Text style={styles.default_text}>Origine : {bottle.origine}</Text>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayBottle()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image: {
        height: 169,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        width: 40,
        height: 40
    }
})
// Ici, le paramètre  state  correspond au state global, celui de notre application. 
// On a choisi ici de retourner le state de notre application dans la fonction  mapStateToProps  . 

// Cela signifie que l'on vient, à l'instant, de mapper le state de notre application dans les props 
// du component BottleDetail.À présent, dans les props du component BottleDetail, 
// vous avez accès au state de l'application et donc aux bouteilles favoris.
const mapStateToProps = state => {
    return {
        favoritesBottle: state.favoritesBottle
        // Ici, on n'a mappé que ce qui nous intéresse, à savoir la liste des bouteilles favoris.
    }
}

export default connect(mapStateToProps)(BottleDetail)