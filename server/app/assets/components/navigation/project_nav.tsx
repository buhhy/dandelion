import * as React from 'react';

var styles = require('./project_nav.scss');

export interface ProjectNavModel {

}

export class ProjectNavComponent extends React.Component<ProjectNavModel, {}> {
  render(): JSX.Element {
    return (
      <nav className="">
        <div></div>
      </nav>
    )
  }
}
