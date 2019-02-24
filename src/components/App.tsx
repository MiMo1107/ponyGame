import * as React from 'react';
import './App.scss';
import Game from './Game/Game';

export default class App extends React.Component<any, {}> {
  public render() {
    return (
      <div className="App">
        <h1>Pony game</h1>
        <p>Powered by:
          <a href={'https://ponychallenge.trustpilot.com/api-docs/index.htm'}>TrustPilot</a>
        </p>
        <Game />
      </div>
    );
  }
}
