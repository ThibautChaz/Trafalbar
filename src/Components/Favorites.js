import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { deconnexionUser, displayCollectionUser } from '../API/TMDBApi';

class Favorites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }
    }

    componentDidMount() {
        
        displayCollectionUser().then((collection) => {
            console.log("collection");
            console.log(collection);
            this.setState({
                data: Object.values(collection)
              });
              console.log("this.state.data");
              console.log(this.state.data);
        });
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

                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                    />
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})

const mapStateToProps = state => {
    return {
        favoritesBottle: state.favoritesBottle
    }
}

export default connect(mapStateToProps)(Favorites);
