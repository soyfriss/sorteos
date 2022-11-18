export const GET_ENTRANTS = "GET_ENTRANTS";
export const ADD_ENTRANTS = "ADD_ENTRANTS";
export const SET_RAFFLE_NAME = "SET_RAFFLE_NAME";
export const SET_RAFFLE_NUMBER_OF_WINNERS = "SET_RAFFLE_NUMBER_OF_WINNERS";
// export const RUN_RAFFLE = "RUN_RAFFLE";

export const getEntrants = () => {
    return {type: GET_ENTRANTS};
}

export const addEntrants = (entrants) => {
    return {
        type: ADD_ENTRANTS,
        payload: entrants
    }
}

export const setRaffleName = (name) => {
    return {
        type: SET_RAFFLE_NAME,
        payload: name
    }
}

export const setRaffleNumberOfWinners = (numberOfWinners) => {
    return {
        type: SET_RAFFLE_NUMBER_OF_WINNERS,
        payload: numberOfWinners
    }
}
