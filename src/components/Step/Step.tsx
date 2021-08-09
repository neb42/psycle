import React from 'react';

import * as Styles from './Step.styles';

export default class Step extends React.Component {
  render() {
    const { title, content, isActive } = this.props;
    return (
      <Styles.Step isActive={isActive} id="step">
        <Styles.Title className="title">{title}</Styles.Title>
        {content}
      </Styles.Step>
    );
  }
}
