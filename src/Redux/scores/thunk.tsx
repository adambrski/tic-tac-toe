import {
    getScores,
    addScore
} from './index';

import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000/api';

export const fetchScoresData = () => {

    return (dispatch: any) => {
        axios
            .get(`${BASE_API_URL}/scores/`)
            .then(res => {
                dispatch(getScores(res.data.reverse()));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const postScoreData = (scoreData: any) => {
    return (dispatch: any) => {
        axios
            .post(`${BASE_API_URL}/score/`, scoreData)
            .then(res => {
                dispatch(addScore(res.data));
            })
            .catch(error => {
                console.log(error)
            });
    }
}