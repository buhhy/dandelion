import * as React from 'react';

var styles = require('./navigation_bar.scss');

export interface NavigationBarModel {
  
}

export class NavigationBarComponent extends React.Component<NavigationBarModel, {}> {
  render(): JSX.Element {
    return (
      <nav className={styles.navigationBar}>
        <div className={styles.coreButton}></div>
        <div className={styles.actionBar}></div>
      </nav>
    )
  }
}
