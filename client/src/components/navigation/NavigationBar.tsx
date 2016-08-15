import * as React from 'react';
import * as styles from './NavigationBar.scss';

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
        return (
            <nav className={`${this.props.className} ${styles.navigationBar}`}>
                <div className={styles.coreButton}>
                    <span className={styles.logoContainer}>
                        <img
                            src={require<string>("./assets/dandelion_logo.svg")}
                            className={styles.logo} />
                    </span>
                    <img
                        src={require<string>("./assets/bell_icon.svg")}
                        className={styles.bell} />
                </div>
                <div className={styles.actionBar}>
                    <h2 className={styles.label}>
                        {this.props.actionBarLabel}
                    </h2>
                </div>
            </nav>
        );
    }
}
