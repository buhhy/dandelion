import {NavigationBarComponent} from './components/navigation/navigation_bar';
import {ProjectNavComponent} from './components/navigation/project_nav';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {ContentPanelComponent} from './components/navigation/content_panel';

var styles = require('./index.scss');

class NavigationModel {
  coreButtonLabel: String = "Dandelion";
  actionBarLabel: String = "Ads";
}

class Root extends React.Component<any, {}> {
  navigationModel: NavigationModel = new NavigationModel();

  render() {
    return (
      <section className={styles.body}>
        <NavigationBarComponent
            styleName={styles.navigation}
            coreButtonLabel={this.navigationModel.coreButtonLabel}
            actionBarLabel={this.navigationModel.actionBarLabel}/>
        <section className={styles.content}>
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
