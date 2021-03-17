import {combineReducers} from 'redux';
import {authReducer} from './../reducers/authReducer';
import {userDataReducer} from './../reducers/userDataReducer';


export const rootReducer = combineReducers({
    authReducer,
     userDataReducer // ломаеться signIn если включить
});