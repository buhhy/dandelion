import * as React from "react";
import * as classNames from "classnames";
import * as styles from "./EntityCardGroup.scss";
import {EntityModel, TextEntityModel} from 'models/timeline/EntityModel';
import {TextEntityCardComponent} from './TextEntityCard';
import {DotLineComponent} from '../DotLine';
import {TimelineController} from '../TimelineController';

export interface EntityCardGroupModel {
  className?: string;
  entities: EntityModel[];
}

interface EntityCardGroupState {
  timelineController: TimelineController
}

export class EntityCardGroupComponent extends React.Component<EntityCardGroupModel, EntityCardGroupState> {
  public static defaultProps: EntityCardGroupModel = {
    entities: []
  };

  componentWillMount(): void {
    this.setState({
      timelineController: new TimelineController()
    });
  }

  componentDidMount(): void {
    this.state.timelineController.addEntities({entities: this.props.entities});
  }

  render(): JSX.Element {
    const rootClasses = classNames(this.props.className, styles.entityGroup);
    return (
        <section className={rootClasses}>
          <DotLineComponent className={styles.dotLine} timelineModel={this.state.timelineController} />
          <article className={styles.cardStack}>
            {this.renderEntities()}
          </article>
        </section>
    )
  }

  private renderEntities(): JSX.Element[] {
    if (this.props.entities.length == 0) return [];

    return  this.props.entities
        .map((entity) => {
          if (entity instanceof TextEntityModel) {
            return (
                <TextEntityCardComponent
                    key={entity.uniqueId}
                    model={entity} />
            );
          }
          return null;
        })
        .filter((element) => element != null);
  }
}

