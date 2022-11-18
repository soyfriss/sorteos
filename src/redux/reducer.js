import { GET_ENTRANTS, ADD_ENTRANTS, SET_RAFFLE_NAME, SET_RAFFLE_NUMBER_OF_WINNERS } from "./actions";

const initialState = {
    name: '',
    numberOfWinners: 3,
    entrants: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ENTRANTS:
            const newList = [...state.entrants]
            action.payload.forEach(c => {

                // Doble chance
                const dobleChance = newList.find(contribuyente => c.Partida === contribuyente.partida);
                if (dobleChance) {
                    dobleChance.chances++;
                } else {
                    newList.push({
                        partida: c.Partida,
                        propietario: c.Propietario,
                        direccion: c.Dirección,
                        isWinner: false,
                        chances: 1
                    });
                }
            });

            return {
                ...state,
                entrants: newList
            }
        case SET_RAFFLE_NAME:
            return {
                ...state,
                name: action.payload
            }
        case SET_RAFFLE_NUMBER_OF_WINNERS:
            return {
                ...state,
                numberOfWinners: action.payload
            }
        default:
            return {...state}
    }
}

export default rootReducer;