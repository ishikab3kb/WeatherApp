export const intialState = {
    lat: 57,
    lon: -2
}

export const actionTypes =  {
    SET_COORD: "SET_COORD"
}


const reducer = (state, action) => {
    console.log(action)


    switch (action.type) {
        case actionTypes.SET_COORD:
            return {
                ...state,
                lat: action.lat,
                lon: action.lon
            }

        default:
            return state
    }
}

export default reducer;
