import * as React from 'react';
import Cell from './Cell/Cell';
import './Maze.scss';

interface IProps {
  pony: number[];
  domokun: number[];
  end: number[];
  width: number;
  height: number;
  fields: string[][];
  ponyId: number;
}

export default class Maze extends React.Component<IProps> {
  public render() {
    const { pony, domokun, end, fields, width, height, ponyId } = this.props;

    return (
       <div className={'maze'} >{fields.map((field: string[], index: number) => {
         const cellStyle = {
           backgroundImage: null,
           flexBasis: `${100 / width}%`,
         };
         const walls = field;

         if ((index + 1) % width === 0 || fields[index + 1].indexOf('west') > -1) {
           walls.push('east');
         }
         if (index > width * height - (width + 1) || fields[index + width].indexOf('north') > -1) {
           walls.push('south');
         }

         if (pony.indexOf(index) > -1) {
           cellStyle.backgroundImage = `url(/assets/img/ponies/${ponyId}.gif)`;
         }

         return (<Cell
          style={cellStyle}
          key={index}
          walls={walls}
          domokun={domokun.indexOf(index) > -1}
          pony={pony.indexOf(index) > -1}
          end={end.indexOf(index) > -1}
          />);
       })}</div>
    );
  }
}
