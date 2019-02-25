import * as React from 'react';
import 'tocca/Tocca.min.js';
import { getMaze, move } from '../../api';
import './Game.scss';
import Maze from './Maze/Maze';
import Form from './Modal/Form/Form';
import Message from './Modal/Message/Message';
import Modal from './Modal/Modal';

interface IState {
  done: boolean;
  message: string;
  image: string;
  mazeId?: string;
  domokun?: number[];
  end?: number[];
  fields?: string[][];
  height?: number;
  pony?: number[];
  ponyId: number;
  width?: number;
}

export default class Game extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      domokun: [],
      done: false,
      end: [],
      fields: [],
      height: undefined,
      image: undefined,
      mazeId: undefined,
      message: undefined,
      pony: [],
      ponyId: undefined,
      width: undefined,
    };
  }

  public update = () => {
    if (this.state.mazeId) {
      getMaze(this.state.mazeId).then((data: object) => {
        this.setState({ ...data });
      });
    }
  }

  public handleKeyDown = (e: KeyboardEvent) => {
    let direction = null;
    switch (e.keyCode) {
      case 37: // Left.
        direction = 'west';
        break;
      case 38: // Up.
        direction = 'north';
        break;
      case 39: // Right.
        direction = 'east';
        break;
      case 40: // Down.
        direction = 'south';
        break;
    }
    return direction;
  }

  public movePony = (direction: string) => {
    if (direction && this.state.mazeId) {
      move(this.state.mazeId, direction).then((data: { state: string }) => {
        if (data.state === 'over' || data.state === 'won') {
          this.setState({ done: true, message: data['state-result'], image: data['hidden-url'] });
        } else if (data.state === 'active' && data['state-result'] === 'Move accepted') {
          this.update();
        }
      });
    }
  }

  public startGame = (mazeId: string, ponyId: number) => {
    this.setState({ mazeId, ponyId });
    this.update();
  }

  public endGame = () => {
    this.setState({
      domokun: [],
      done: false,
      end: [],
      fields: [],
      mazeId: undefined,
      pony: [],
      ponyId: undefined,
    });
  }

  public updateSize = (width: number, height: number) => {
    const fields = [];
    for (let i = 0; i < width * height; i += 1) {
      fields[i] = ['north', 'south', 'east', 'west'];
    }
    this.setState({ width, height, fields });
  }

  public componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('swipeup', () => this.movePony('south'));
    document.addEventListener('swipedown', () => this.movePony('north'));
    document.addEventListener('swiperight', () => this.movePony('west'));
    document.addEventListener('swipeleft', () => this.movePony('east'));
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('swipeup', () => this.movePony('south'));
    document.removeEventListener('swipedown', () => this.movePony('north'));
    document.removeEventListener('swiperight', () => this.movePony('west'));
    document.removeEventListener('swipeleft', () => this.movePony('east'));
  }

  public render() {
    const { done, message, image, mazeId, domokun, end, fields, height, pony, ponyId, width } =
      this.state;
    return (
      <div className="Game">
        { !mazeId ? (
          <Modal>
            <Form updateSize={this.updateSize} startGame={this.startGame} />
          </Modal>
        ) : done && (
          <Modal>
            <Message message={message} image={image} endGame={this.endGame} />
          </Modal>
        )}
        <Maze
          domokun={domokun}
          end={end}
          fields={fields}
          height={height}
          pony={pony}
          ponyId={ponyId}
          width={width} />
      </div>
    );
  }
}
