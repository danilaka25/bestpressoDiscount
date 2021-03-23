export const fetchIikoPending = () => {
    console.log("User data action fetchIikoPending")
    return {
        type: "FETCH_IIKOUSERDATA_PENDING"
    }
}

export const fetchIikoSuccess = (iikoUserData) => {
    console.log("User data action fetchIikoSuccess")
    return {
        type: "FETCH_IIKOUSERDATA_SUCCESS",
        iikoUserData: iikoUserData
    }
}

export const fetchIikoError = (error) => {
    console.log("User data action fetchIikoError")
    return {
        type: "FETCH_IIKOUSERDATA_ERROR",
        error: error
    }
}