import * as React from 'react';
import { HOST } from '../../../../api';
import './Message.scss';

interface IProps {
  message: string;
  image: string;
  endGame: () => void;
}

export default class Message extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { message, image, endGame } = this.props;
    return (
       <div className={'message'}>
         <p>{message}</p>
         <img src={HOST + image}/>
         <button onClick={endGame}>End game</button>
       </div>
    );
  }
}
