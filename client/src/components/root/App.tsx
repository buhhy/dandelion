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
  }
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
            <ContentPanelComponent className={styles.contentPanel} />
          </section>

          <h1>Relay test</h1>
          <ul>
            {this.props.viewer.timeline.edges.map(edge =>
                <li key={edge.node.id}>{edge.node.name} (ID: {edge.node.id})</li>
            )}
          </ul>
        </section>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        timeline(first: 10) {
          edges {
            node {
              id,
              title,
              content
            },
          },
        },
      }
    `,
  },
});
