import { createStore } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';

export default createStore(toggleFavorite);
//On initialise le store en lui faisant passer notre reducer.