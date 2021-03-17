const initialUserDataState = {
    userData: true,
  };
  
  export const userDataReducer = (state = initialUserDataState, action) => {
    //console.log('initialUserDataState', action.payload)
    switch (action.type) {    
      case "UPDATE_USER_DATA":
        console.log("reducer UPDATE_USER_DATA")
        return {
            userData: action.payload
        };
      default:
        console.log("reducer default")
        return state;
    }
  };