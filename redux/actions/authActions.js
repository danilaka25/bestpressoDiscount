export const restoreToken = data => {
    console.log("action restoreToken")
    return { type: 'RESTORE_TOKEN', payload: data };
};

export const signIn = data => {
    console.log("action signIn")
    return { type: 'SIGN_IN', payload: data };
};

export const signOut = data => {
    console.log("action signOut")
    return { type: 'SIGN_OUT', payload: data };
};