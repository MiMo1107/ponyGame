import * as React from 'react';
import './Cell.scss';

interface IProps {
  style: object;
  pony: boolean;
  domokun: boolean;
  end: boolean;
  walls: string[];
}

export default class Cell extends React.Component<IProps> {
  public render() {
    const { style, pony, domokun, end, walls } = this.props;
    const classNames =
    `cell ${walls.join(' ')}${pony ? ' pony' : ''}${domokun ? ' domokun' : ''}${end ? ' end' : ''}`;

    return (
       <div className={classNames} style={style} />
    );
  }
}
