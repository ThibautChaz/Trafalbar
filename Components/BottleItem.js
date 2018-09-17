import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getUrlFromStorage } from '../API/TMDBApi';

class BottleItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgSrc: require('../Images/ic_image.png')
        }
        const { bottle } = this.props;

        getUrlFromStorage(bottle.image)
            .then(url => this.setState({ imgSrc: { uri: url } }))
            .catch(err => console.error(err));
    }

    _displayFavoriteImage() {
        if (this.props.isBottleFavorite) {
            // Si la props isBottleFavorite vaut true, on affiche le 🖤
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../Images/ic_favorite.png')}
                />
            )
        }
    }

    render() {
        const { bottle, displayDetailForBottle } = this.props;
        const { imgSrc } = this.state;
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => displayDetailForBottle(bottle.nom)}
            >
                <Image
                    style={styles.image}
                    source={imgSrc}                    
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.title_text}>{bottle.nom}</Text>
                        {/* <Text style={styles.vote_text}>{bottle.bouche}</Text> */}
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{bottle.description}</Text>
                        {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sorti le {bottle.nom}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default BottleItem