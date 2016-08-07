import * as React from 'react';
import * as classNames from 'classnames';

var styles = require('./navigation_bar.scss');

export interface NavigationBarModel {
  actionBarLabel: String;
  className?: String
  coreButtonLabel: String;
}

export class NavigationBarComponent extends React.Component<NavigationBarModel, {}> {
  public static defaultProps: NavigationBarModel = {
    actionBarLabel: '',
    className: '',
    coreButtonLabel: ''
  };

  render(): JSX.Element {
    let rootClasses = classNames([this.props.className, styles.navigationBar]);
    return (
        <nav className={rootClasses}>
          <div className={styles.coreButton}>
            <span className={styles.logoContainer}>
              <img src={require("./assets/dandelion_logo.svg")} className={styles.logo} />
            </span>
            <img src={require("./assets/bell_icon.svg")} className={styles.bell} />
          </div>
          <div className={styles.actionBar}>
            <h2 className={styles.label}>{this.props.actionBarLabel}</h2>
          </div>
        </nav>
    )
  }
}
