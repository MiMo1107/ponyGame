import * as React from 'react';
import './Modal.scss';

export default class Modal extends React.Component<{}, {}> {
  public render() {
    return (
       <div className={'modal'}>
        <div className={'content'}>
          {this.props.children}
        </div>
       </div>
    );
  }
}
