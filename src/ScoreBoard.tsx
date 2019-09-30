import * as React from 'react';
import { connect } from 'react-redux';

export interface ScoreBoardProps {
    scoreHistory: React.MouseEventHandler<HTMLElement>;
    scoreList: Array<any>;
}

class ScoreBoard extends React.Component<ScoreBoardProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const { scoreList, scoreHistory } = this.props;
        return (
            <React.Fragment>
                <div className="disable-container" />
                <div className="score-board">
                    <div className="score-body">
                        <table className="scores-table">
                            <tbody>
                                <tr>
                                    <th>Time</th>
                                    <th>Winner</th>
                                </tr>
                                {scoreList.map((list, index) => (
                                    <tr key={`score-${index}`}>
                                        <th>{list.finished_at}</th>
                                        <th>{list.winner}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="score-close-btn" onClick={scoreHistory}>close</button>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any, props: any) => {
    return {
        scoreList: state.scores.scoresList,
    };
};

export default connect(
    mapStateToProps,
    undefined
)(ScoreBoard);