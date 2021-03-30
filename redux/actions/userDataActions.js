export const fetchIikoPending = () => {
    return {
        type: "FETCH_IIKOUSERDATA_PENDING"
    }
}

export const fetchIikoSuccess = (iikoUserData) => {
    return {
        type: "FETCH_IIKOUSERDATA_SUCCESS",
        iikoUserData: iikoUserData
    }
}

export const fetchIikoError = (error) => {
    return {
        type: "FETCH_IIKOUSERDATA_ERROR",
        error: error
    }
}