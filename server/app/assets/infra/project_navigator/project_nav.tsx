import * as React from 'react';
import * as classNames from 'classnames';

var styles = require('./project_nav.scss');

export interface ProjectNavModel {
  className?: String
}

export class ProjectNavComponent extends React.Component<ProjectNavModel, {}> {
  public static defaultProps: ProjectNavModel = {
    className: ''
  };

  render(): JSX.Element {
    let rootClasses = classNames([this.props.className]);
    let rows: Array<Element> = [];

    for (let datum of this.props.categories) {
      rows.push(
          <li key={}></li>
      );
    }

    return (
        <nav className={rootClasses}>
          <h1>
            <span>Projects</span>
            <input
                className={styles.newProjectButton}
                type="button"
                value="Add Project +" />
          </h1>
          <ul className={styles.projectList}>
            {rows}
          </ul>
        </nav>
    );
  };
}

