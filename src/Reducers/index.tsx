import { combineReducers } from 'redux';
import scoresReducer from '../Redux/scores/reducer';

export default combineReducers({
    scores: scoresReducer
});