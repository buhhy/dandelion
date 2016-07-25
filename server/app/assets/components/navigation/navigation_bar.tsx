import * as React from 'react';

var styles = require('./navigation_bar.scss');

export interface NavigationBarModel {
  coreButtonLabel: String;
  actionBarLabel: String;
}

export class NavigationBarComponent extends React.Component<NavigationBarModel, {}> {
  render(): JSX.Element {
    return (
      <nav className={styles.navigationBar}>
        <div className={styles.coreButton}>
          <h1 className={styles.label}>{this.props.coreButtonLabel}</h1>
          <image></image>
        </div>
        <div className={styles.actionBar}>
          <h2 className={styles.label}>{this.props.actionBarLabel}</h2>
        </div>
      </nav>
    )
  }
}
