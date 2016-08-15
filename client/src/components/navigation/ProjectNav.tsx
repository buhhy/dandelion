import * as React from 'react';
import * as styles from './ProjectNav.scss'

export interface ProjectNavModel {
  className?: String
}

export class ProjectNavComponent extends React.Component<ProjectNavModel, {}> {
  public static defaultProps: ProjectNavModel = {
    className: ''
  };

  render(): JSX.Element {
    return (
        <nav className={`${this.props.className} ${styles.sideNavigation}`}>
          <div />
        </nav>
    );
  }
}
