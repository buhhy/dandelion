import * as React from 'react';
import * as Relay from 'react-relay';
import * as styles from './Timeline.scss';
import {NewEntityCardComponent} from './cards/NewEntityCard';
import {TextEntityModel, EntityModel} from 'models/timeline/EntityModel';
import {EntityCardGroupComponent} from './cards/EntityCardGroup';
import autobind = require("autobind-decorator");

export interface EntityModelConnection {
  edges: {
    node: {
      type: string,
      id: string,
      title: string,
      content: string,
      createDate: number,
    }
  }[]
}

export interface TimelineComponentModel {
  model?: TimelineController;
  viewer: {id: string};
  timeline: EntityModelConnection;
}

function isDomElement(instance: React.ReactInstance): instance is Element {
  return (instance as Element).addEventListener !== undefined;
}

class TimelineComponent
    extends React.Component<TimelineComponentModel, {}> {

  render(): JSX.Element {
    return (
        <article className={styles.container}>
          {/*<DotLineComponent*/}
              {/*className={styles.chronology}*/}
              {/*timelineModel={this.props.model} />*/}
          <section className={styles.cardStack}>
            <NewEntityCardComponent
                viewer={this.props.viewer}
                onCreateEntity={this.onCreateEntity} />
            {this.renderEntityGroups()}
          </section>
        </article>
    );
  }

  private renderEntityGroups(): JSX.Element[] {
    const visibleEntities: EntityModel[] = this.props.timeline.edges
        .map(edge => {
          const {node} = edge;
          // Support other model types.
          if (node.type === 'TextEntity')
            return new TextEntityModel(node);
          return null;
        })
        .filter(value => value != null);

    const dateToEntities = new Map<string, EntityModel[]>();

    visibleEntities.forEach((entity) => {
      const entities = dateToEntities.get(entity.createDateHash) || [];
      entities.push(entity);
      dateToEntities.set(entity.createDateHash, entities);
    });

    const sortedDates = Array.from(dateToEntities.keys()).sort();

    return sortedDates.map((date) =>
        <EntityCardGroupComponent
            key={date}
            entities={dateToEntities.get(date) || []} />);
  }
}

const TimelineComponentContainer = Relay.createContainer(TimelineComponent, {
  fragments: {
    timeline: () => Relay.QL`
      fragment on TextEntityConnection {
        edges {
          node {
            type: __typename,
            id,
            title,
            content
          }
        }
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${NewEntityCardComponent.getFragment('viewer')}
      }
    `,
  }
});

export {TimelineComponentContainer as TimelineComponent};
