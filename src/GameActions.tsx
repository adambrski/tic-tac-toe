import * as React from 'react';

interface GameActionsProps {
    reset: React.MouseEventHandler<HTMLElement>;
    scoreHistory: React.MouseEventHandler<HTMLElement>;
    stepNumber: number;
    winner: any;
    status: string;
}

export const GameActions: React.SFC<GameActionsProps> = props => (
    <React.Fragment>
        <div className="controls">
            <a className="control-reset" onClick={props.reset}>
                Start new game      
            </a>
            <a className="control-score" onClick={props.scoreHistory}>
                Score history
            </a>
        </div>
        {(props.winner || props.stepNumber >= 9) &&
            <React.Fragment>
                <div className="disable-container" />
                <div className="game-modal">
                    <p className="modal-text">{props.status}</p>
                    <button className="control-reset" onClick={props.reset}>Start new game</button>
                    <button className="control-score" onClick={props.scoreHistory}>Score history</button>
                </div>
            </React.Fragment>
        }
    </React.Fragment>
);
