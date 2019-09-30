import * as React from 'react';
import { Square } from './Square';

export type SquareState = 'X' | 'O' | null;

export interface GameBoardProps {
    onClick(index: number): void;
    squares: Array<SquareState>;
    winnerLine?: Array<number>;
    status?: string;
}

class GameBoard extends React.Component<GameBoardProps> {
    renderSquare(i: number): React.ReactNode {
        const { winnerLine, squares, onClick } = this.props;
        const isWinner = winnerLine && winnerLine.indexOf(i) > -1;
        return (
            <Square
                value={squares[i]}
                index={i}
                onClick={onClick}
                isWinner={isWinner}
            />
        )
    }
    renderRow(j: number): React.ReactNode {
        return (
            <div className="board-row">
                {this.renderSquare(j)}
                {this.renderSquare(j + 1)}
                {this.renderSquare(j + 2)}
            </div>
        );
    }
    render() {
        const { status } = this.props;
        return (
            <div className="app-board">
                <div className="game-info">
                    <div className="text-center">{status}</div>
                </div>
                <div className="game-board">
                    <div>
                        {this.renderRow(0)}
                        {this.renderRow(3)}
                        {this.renderRow(6)}
                    </div>
                </div>
            </div>
        );
    }
}

export default GameBoard