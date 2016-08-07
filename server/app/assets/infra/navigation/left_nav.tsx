import * as React from 'react';
import * as classNames from 'classnames';
import {ProjectNavComponent} from 'infra/project_navigator/project_nav';

var styles = require('./left_nav.scss');

export interface LeftNavModel {
  className?: String
}

export class LefNavComponent extends React.Component<LeftNavModel, {}> {
  public static defaultProps: LeftNavModel = {
    className: ''
  };

  render(): JSX.Element {
    let rootClasses = classNames([this.props.className, styles.sideNavigation]);
    return (
        <nav className={rootClasses}>
          <ProjectNavComponent />
        </nav>
    );
  }
}
