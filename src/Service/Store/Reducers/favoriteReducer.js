
const initialState = { favoritesBottle: [] }


function toggleFavorite(state = initialState, action) {
    let nextState
    switch(action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteBottleIndex = state.favoritesBottle.findIndex(item => item.id === action.value.id)
            if(favoriteBottleIndex !== -1) {
                nextState = { // On creer un nouveau state pour respecter le principe dimmuable
                    ...state,// On copie le state initial
                    favoritesBottle: state.favoritesBottle.filter((item, index) => index !== favoriteBottleIndex)
                    // on redéfinit les bouteilles favoris de l'objet  nextState  avec un tableau 
                    // qui correspond aux bouteilles favoris du  state ,  
                    // auquel on a enlevé la bouteille à l'index spécifié (fonction  filter ). 
                }
            }
            else {
                nextState = {
                    ...state, 
                    favoritesBottle: [...state.favoritesBottle, action.value]
                }
            }
            return nextState || state
            // renvoie l'objet  nextState  si celui-ci n'est pas undefined, sinon on renvoie l'objet  state
        default:
            return state
    }
}

export default toggleFavorite;
