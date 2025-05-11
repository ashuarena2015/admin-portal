import axios from 'axios';
const error = store => next => action => {
    if(action.type === 'GLOBAL_MESSAGE') {
        return next(action);
    } else {
        next(action);
    }
}

export default error;
