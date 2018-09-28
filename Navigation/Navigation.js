import React from "react";
import { StyleSheet, Image } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import Search from "../Components/Search";
import BottleDetail from "../Components/BottleDetail";
import Favorites from "../Components/Favorites";
import Login from "../Components/Login";
import Inscription from "../Components/Inscription";
import Profil from "../Components/Profil";
import ResetPassword from "../Components/ResetPassword";

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher"
    }
  },
  BottleDetail: {
    screen: BottleDetail
  }
});

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: "Favoris"
    }
  },
  BottleDetail: {
    screen: BottleDetail
  }
});

const BottlesTabNavigator = createBottomTabNavigator(
  {    
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_favorite.png")}
              style={styles.icon}
            />
          );
        }
      }
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          // On définit le rendu de nos icônes par les images récemment ajoutés au projet
          return (
            <Image
              source={require("../Images/ic_search.png")}
              style={styles.icon}
            />
          ); // On applique un style pour les redimensionner comme il faut
        }
      }
    },
    Profil: {
      screen: Profil, 
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_profil.png")}//Tu dl un icon profil que tu veux et tu change ici le nom psk la ca sera licon favoris
              style={styles.icon}
            />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#DDDDDD", // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: "#FFFFFF", // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
);

const AuthSwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login"
      }
    },
    Inscription: {
      screen: Inscription,
      navigationOptions: {
        title: "Inscription"
      }
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        title: "ResetPassword"
      }
  },
  },
  {
    initialRouteName: 'Login'
  }
)

const RootSwitchNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: AuthSwitchNavigator
    },
    Main: {
      screen: BottlesTabNavigator
    }
  },
  {
    initialRouteName: 'Auth'
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
});

export default RootSwitchNavigator;
