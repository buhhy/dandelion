import {NavigationBarComponent} from './components/navigation/navigation_bar';
import {ProjectNavComponent} from './components/navigation/project_nav';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {ContentPanelComponent} from './components/navigation/content_panel';

var styles = require('./index.scss');

class Root extends React.Component<any, {}> {
  render() {
    return (
      <section className={styles.body}>
        <NavigationBarComponent />
        <section>
          <ProjectNavComponent />
          <ContentPanelComponent />
        </section>
      </section>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('app'));
