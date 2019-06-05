import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import {
    LOGOUT_USER
} from '../actions/types';

const appReducer = combineReducers({
    loginReducer: loginReducer,
    signupReducer: signupReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_USER) {
        state = undefined
    }

    return appReducer(state, action)
};

export default rootReducer;