const initialState = {
    pending: false,
    iikoUserData: [],
    error: null
}

export const  userDataReducer = (state = initialState, action) => {
   
    switch(action.type) {
        case "FETCH_IIKOUSERDATA_PENDING": 
            return {
                ...state,
                pending: true
            }
        case "FETCH_IIKOUSERDATA_SUCCESS":
            return {
                ...state,
                pending: false,
                iikoUserData: action.iikoUserData
            }
        case "FETCH_IIKOUSERDATA_ERROR":
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}


