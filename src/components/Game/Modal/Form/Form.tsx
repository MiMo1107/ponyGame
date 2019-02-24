import * as React from 'react';
import { createMaze } from '../../../../api';
import { ponies } from '../../../../config';
import './Form.scss';

interface IState {
  ponyId?: number;
  difficulty?: number;
  height?: number;
  width?: number;
}

interface IProps {
  updateSize: (width: number, hight: number) => void;
  startGame: (mazeId: string, ponyId: number) => void;
}

export default class Form extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      difficulty: 5,
      height: 20,
      ponyId: 1,
      width: 20,
    };
    this.props.updateSize(this.state.width, this.state.width);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleChange = (event: React.ChangeEvent<HTMLSelectElement|HTMLInputElement>) => {
    const element = event.target;
    const value = Number(element.value);

    switch (element.name) {
      case 'pony':
        this.setState({ ponyId : value });
        break;
      case 'difficulty':
        this.setState({ difficulty : value });
        break;
      case 'height':
        this.setState({ height : value });
        this.props.updateSize(this.state.width, this.state.height);
        break;
      case 'width':
        this.setState({ width : value });
        this.props.updateSize(this.state.width, this.state.height);
        break;
    }
  }

  public handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { width, height, ponyId, difficulty } = this.state;
    createMaze(width, height, ponies[ponyId].name, difficulty).then((mazeId) => {
      this.props.startGame(mazeId, this.state.ponyId);
    });
  }

  public render() {
    const { ponyId, difficulty, height, width } = this.state;
    return (
       <form onSubmit={this.handleSubmit} className={'create-game-form'}>
        <label>
          <b>Width</b>
          <input
            type={'number'}
            name={'width'}
            min={15}
            max={25}
            onChange={this.handleChange}
            value={width}/>
        </label>
        <label>
          <b>Height</b>
          <input
            type={'number'}
            name={'height'}
            min={15}
            max={25}
            onChange={this.handleChange}
            value={height}/>
        </label>
        <label>
          <b>Difficulty</b>
          <input
            type={'number'}
            name={'difficulty'}
            min={0}
            max={10}
            onChange={this.handleChange}
            value={difficulty}/>
        </label>
        <label>
          <b>Pony</b>
          <select name={'pony'} onChange={this.handleChange} value={ponyId}>
            {
              ponies.map((item) => {
                return <option value={item.id} key={item.id}>{item.name}</option>;
              })
            }
          </select>
        </label>
        <button type={'submit'}>Start spil</button>
       </form>
    );
  }
}
