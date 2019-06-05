import {
    SIGNUP_PASSWORD_CHANGED,
    SIGNUP_EMAIL_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
};

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case SIGNUP_EMAIL_CHANGED:
            return { ...state, email: actions.payload };

        case SIGNUP_PASSWORD_CHANGED:
            return { ...state, password: actions.payload };

        default:
            return state;
    }
};
