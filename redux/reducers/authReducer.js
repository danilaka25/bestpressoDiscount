

const initialAuthState = {
  isLoading: true,
  isSignout: false,
  fireBaseToken: null,
};




export const authReducer = (state = initialAuthState, action) => {
  //console.log("reducer action", action)
  switch (action.type) {
    case "RESTORE_TOKEN":
      console.log("reducer RESTORE_TOKEN")
      return {
        ...state,
        fireBaseToken: action.payload,
        isLoading: false,
      };
    case "SIGN_IN":
      console.log("reducer SIGN_IN")
      return {
        ...state,
        isSignout: false,
        fireBaseToken: action.payload,
      };
    case "SIGN_OUT":
      console.log("reducer SIGN_OUT")
      return {
        ...state,
        isSignout: true,
        fireBaseToken: null,
      };
    default:
      console.log("reducer default")
      return {
        ...state,
      };
  }
};