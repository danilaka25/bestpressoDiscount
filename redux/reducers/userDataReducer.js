const initialState = {
    pending: false,
    iikoUserData: [],
    error: null
}

export const  userDataReducer = (state = initialState, action) => {
   
    switch(action.type) {
        case "FETCH_IIKOUSERDATA_PENDING": 
        console.log("FETCH_IIKOUSERDATA_PENDING")
            return {
                ...state,
                pending: true
            }
        case "FETCH_IIKOUSERDATA_SUCCESS":
          console.log("FETCH_IIKOUSERDATA_SUCCESS")
            return {
                ...state,
                pending: false,
                iikoUserData: action.iikoUserData
            }
        case "FETCH_IIKOUSERDATA_ERROR":
          console.log("FETCH_IIKOUSERDATA_ERROR")
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}


// function getIikoUserData() {

//   return {
//       type: FETCH_IIKOUSERDATA_PENDING
//   }
// }

// function getIikoUserDataPending(data) {

//   return {
//       type: FETCH_IIKOUSERDATA_SUCCESS,
//       data
//   }
// }

// function getIikoUserDataError() {
//   return {
//       type: FETCH_IIKOUSERDATA_ERROR
//   }
// }

// export const getIikoUserData = state => state.iikoUserData;
// export const getIikoUserDataPending = state => state.pending;
// export const getIikoUserDataError = state => state.error;