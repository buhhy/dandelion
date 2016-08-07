import {ContentPanelComponent} from 'infra/navigation/content_panel';
import {NavigationBarComponent} from 'infra/navigation/navigation_bar';
import {LefNavComponent} from 'infra/navigation/left_nav';
import * as ReactDOM from 'react-dom';
import * as React from 'react';

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
            className={styles.navigation}
            coreButtonLabel={this.navigationModel.coreButtonLabel}
            actionBarLabel={this.navigationModel.actionBarLabel}/>
        <section className={styles.content}>
          <LefNavComponent
              className={styles.projectNavigation} />
          <ContentPanelComponent
              className={styles.contentPanel}/>
        </section>
      </section>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('app'));
