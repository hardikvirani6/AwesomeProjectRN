import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
};

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case EMAIL_CHANGED:
            return { ...state, email: actions.payload };

        case PASSWORD_CHANGED:
            return { ...state, password: actions.payload };

        default:
            return state;
    }
};
