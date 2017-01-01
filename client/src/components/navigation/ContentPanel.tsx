import * as React from 'react';
import * as Relay from 'react-relay';
import * as styles from "./ContentPanel.scss";
import {
  TimelineComponent,
  EntityModelConnection
} from "components/timeline/Timeline";

export interface ContentPanelModel {
  className?: String;
  timeline: EntityModelConnection
}

class ContentPanelComponent extends React.Component<ContentPanelModel, {}> {
  public static defaultProps: ContentPanelModel = {
    className: '',
    timeline: {
      edges: []
    },
  };

  render(): JSX.Element {
    return (
      <section className={`${this.props.className} ${styles.panel}`}>
        <TimelineComponent timeline={this.props.timeline} />
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
    `
  }
});

export {Container as ContentPanelComponent};
