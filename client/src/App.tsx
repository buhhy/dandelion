import * as React from 'react';
import * as Relay from 'react-relay';
import {NavigationBarComponent} from 'components/navigation/NavigationBar';
import {ProjectNavComponent} from 'components/navigation/ProjectNav';
import {ContentPanelComponent} from 'components/navigation/ContentPanel';

const styles = require<any>('./App.scss');

interface Props {
    viewer: {
        widgets: {
            edges: {
                node: {
                    id: string,
                    name: string
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
                  {this.props.viewer.widgets.edges.map(edge =>
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
        widgets(first: 10) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
});
