import * as React from 'react';
import * as Relay from 'react-relay';
import * as styles from './App.scss';
import {NavigationBarComponent} from 'components/navigation/NavigationBar';
import {ProjectNavComponent} from 'components/navigation/ProjectNav';
import {ContentPanelComponent} from 'components/navigation/ContentPanel';

interface Props {
  viewer: {
    timeline: {
      edges: {
        node: {
          id: string,
          title: string,
          content: string
        }
      }[]
    }
  };
}

class App extends React.Component<Props, {}> {
  render() {
    return (
        <section className={styles.body}>
          <NavigationBarComponent
              className={styles.navigation}
              coreButtonLabel="Dandelion"
              actionBarLabel="Ads" />
          <section className={styles.content}>
            <ProjectNavComponent className={styles.projectNavigation} />
            <ContentPanelComponent
                className={styles.contentPanel}
                timeline={this.props.viewer.timeline} />
          </section>
        </section>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        timeline(first: 10) { ${ContentPanelComponent.getFragment('timeline')} }
      }
    `,
  }
});
