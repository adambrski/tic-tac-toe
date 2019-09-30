import * as React from 'react';
import { connect } from 'react-redux';
import { isNullOrUndefined, isUndefined } from 'util';
import GameBoard, { SquareState } from './GameBoard';
import ScoreBoard from './ScoreBoard';
import { GameActions } from './GameActions';
import { detectWinner, getWinnerLine } from './Utilities';
import { fetchScoresData, postScoreData } from './Redux/scores/thunk';
import './App.css';

type GameBoardState = Array<SquareState>;

export interface AppProps {
  fetchScoresData: () => void;
  postScoreData: (scoreData: any) => void;
}


export interface AppState {
  history: Array<GameBoardState>,
  stepNumber: number;
  winner: SquareState;
  winnerLine?: Array<number>;
  xIsNext: boolean;
  isScoreBoard: boolean;
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: any) {
    super(props);
    this.reset();
  }

  reset = () => {
    this.props.fetchScoresData();
    const history = [
      Array(9).fill(null)
    ];

    const state = {
      history,
      stepNumber: 0,
      winner: null,
      winnerLine: undefined,
      xIsNext: true,
      isScoreBoard: false
    };

    if (isUndefined(this.state)) {
      this.state = state;
    } else {
      this.setState(state);
    }
  }

  handleGameBoardClick = (i: number) => {
    const { history, xIsNext, stepNumber } = this.state;

    const boardState = history.slice(-1).pop() as GameBoardState;
    if (!isNullOrUndefined(boardState[i]) || this.state.winner) {
      return;
    }
    
    boardState[i] = xIsNext ? 'X' : 'O';
    const winner = detectWinner(boardState);
    const winnerLine = getWinnerLine(boardState);

    if (winner || stepNumber + 1 >= 9) {
      let player = '';
      switch (winner) {
        case 'X':
          player = 'Player 1'
          break;
        case 'O':
          player = 'Player 2'
          break;
        default:
          player = 'Tie'
          break;
      }
      this.props.postScoreData({
        winner: player
      });
    }
    this.setState({
      history: history.concat([boardState]),
      stepNumber: stepNumber + 1,
      winner,
      winnerLine,
      xIsNext: !xIsNext,
    })
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    })
  }

  scoreHistory = () => {
    this.setState({
      isScoreBoard: !this.state.isScoreBoard
    });
  }

  getStatusText():  string {
    const { winner, stepNumber, xIsNext } = this.state;

    if (winner || stepNumber >= 9) {
      return '';
    }
    return xIsNext ? 'Player 1: X' : 'Player 2: O';
  }

  getWinnerText(): string {
    const { winner, stepNumber } = this.state;

    if (winner) {
      return 'Winner: ' + (winner === 'X' ? 'Player 1' : 'Player 2');
    }
    else if (stepNumber >= 9) {
      return "It's a tie!";
    }

    return '';
  }

  render() {
    const { history, stepNumber, winnerLine, winner, isScoreBoard } = this.state;
    const current = history[stepNumber];
    const status = this.getStatusText();
    const winnerText = this.getWinnerText();

    return (
      <div className="App">
        <GameActions
          scoreHistory={this.scoreHistory}
          reset={this.reset}
          stepNumber={stepNumber}
          winner={winner}
          status={winnerText}
        />
        <GameBoard
          squares={current}
          winnerLine={winnerLine}
          status={status}
          onClick={this.handleGameBoardClick}
        />
        {isScoreBoard &&
          <ScoreBoard
            scoreHistory={this.scoreHistory}
          />
        }
      </div>
    );
  }
}

const mapDispatch = {
  fetchScoresData,
  postScoreData
};

export default connect(
  undefined,
  mapDispatch
)(App);