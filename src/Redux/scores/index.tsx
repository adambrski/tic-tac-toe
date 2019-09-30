import actionTypes from './actionTypes';

export const getScores = (scores: Array<any>) => ({
    type: actionTypes.GET_SCORES,
    payload: scores
});


export const addScore = (score: any) => ({
    type: actionTypes.ADD_SCORE,
    payload: score
});