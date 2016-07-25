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
    var rootClasses = classNames([this.props.className, styles.sideNavigation]);
    return (
        <nav className={rootClasses}>
          <div></div>
        </nav>
    );
  }
}
