import * as React from 'react';
import * as Relay from 'react-relay';
import * as styles from "./ContentPanel.scss";
import {TimelineComponent} from "components/timeline/Timeline";

export interface ContentPanelModel {
  className?: String;
  viewer: {id: string},
  timeline: {
    edges: {
      node: {
        id: string,
        title: string,
        content: string
      }
    }[]
  };
}

class ContentPanelComponent extends React.Component<ContentPanelModel, {}> {
  public static defaultProps: ContentPanelModel = {
    className: ''
  };

  render(): JSX.Element {
    return (
      <section className={`${this.props.className} ${styles.panel}`}>
        <TimelineComponent
            viewer={this.props.viewer}
            timeline={this.props.timeline} />
      </section>
    )
  }
}

const Container = Relay.createContainer(ContentPanelComponent, {
  fragments: {
    timeline: () => Relay.QL`
      fragment on TextEntityConnection {
        ${TimelineComponent.getFragment('timeline')}
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${TimelineComponent.getFragment('viewer')}
      }
    `,
  }
});

export {Container as ContentPanelComponent};
