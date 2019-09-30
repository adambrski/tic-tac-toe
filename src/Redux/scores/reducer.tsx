import actionTypes from './actionTypes';

const defaultState = {
    scoresList: [],
    score: {}
};
  
export default function ScoresReducer(state = defaultState, action: any) {
  switch (action.type) {  
      case actionTypes.GET_SCORES:
        return {
            ...state,
            scoresList: action.payload
        };   
      case actionTypes.ADD_SCORE:
        return {
            ...state,
            scoresList: [ action.payload, ...state.scoresList ]
        }; 
    default:
      return state;
  }
}