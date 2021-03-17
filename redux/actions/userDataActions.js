export const updateUserData = data => {
    console.log("action updateUserData")
    return {type: 'UPDATE_USER_DATA', payload: data};
};