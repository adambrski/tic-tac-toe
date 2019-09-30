import * as classNames from 'classnames';
import * as React from 'react';

interface SquareProps {
    isWinner?: boolean;
    index: number;
    onClick(index: number): void;
    value: React.ReactNode;
}

export class Square extends React.Component<SquareProps> {
    onClick = (): void => {
        this.props.onClick(this.props.index);
    }
    render() {
        return (
            <button className={classNames('square', { winner: this.props.isWinner })} onClick={this.onClick}>
            {this.props.value}
        </button>            
        );
    }
}
