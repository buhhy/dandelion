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
  timeline: EntityModelConnection;
}

class TimelineComponent
    extends React.Component<TimelineComponentModel, {}> {

  @autobind
  onCreateEntity(newEntity: EntityModel): void {
    // TODO(tlei): send mutate action

    this.forceUpdate();
  }

  renderEntityGroups(): JSX.Element[] {
    const visibleEntities = this.props.timeline.edges
        .map(edge => {
          const {node} = edge;
          // Support other model types.
          if (node.type === 'TextEntity')
            return new TextEntityModel(node);
          return null;
        })
        .filter(value => value != null);

    const dateToEntities = new Map<string, EntityModel>();

    visibleEntities.forEach((entity) => {
      const entities = dateToEntities.get(entity.createDateHash) || [];
      entities.push(entity);
      dateToEntities.set(entity.createDateHash, entities);
    });

    const sortedDates = Array.from(dateToEntities.keys()).sort();

    return sortedDates.map((date) =>
        <EntityCardGroupComponent
            key={date}
            entities={dateToEntities.get(date)} />);
  }

  render(): JSX.Element {
    return (
        <article className={styles.container}>
          {/*<DotLineComponent*/}
              {/*className={styles.chronology}*/}
              {/*timelineModel={this.props.model} />*/}
          <section className={styles.cardStack}>
            <NewEntityCardComponent onCreateEntity={this.onCreateEntity} />
            {this.renderEntityGroups()}
          </section>
        </article>
    );
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
    `
  }
});

export {TimelineComponentContainer as TimelineComponent};
