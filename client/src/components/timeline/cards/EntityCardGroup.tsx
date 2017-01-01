import * as React from "react";
import * as classNames from "classnames";
import * as styles from "./EntityCardGroup.scss";
import {EntityModel, TextEntityModel} from 'models/timeline/EntityModel';
import {TextEntityCardComponent} from './TextEntityCard';

export interface EntityCardGroupModel {
  className?: String;
  entities: EntityModel[];
}

export class EntityCardGroupComponent extends React.Component<EntityCardGroupModel, {}> {
  public static defaultProps: EntityCardGroupModel = {
    entities: []
  };

  renderEntities(): JSX.Element[] {
    if (this.props.entities.length == 0) return null;

    return this.props.entities.map((entity) => {
      if (entity instanceof TextEntityModel) {
        return (
            <TextEntityCardComponent
                key={entity.uniqueId}
                model={entity} />
        );
      }
      return null;
    });
  }

  render(): JSX.Element {
    const rootClasses = classNames([this.props.className, 'entity-group']);
    return (
        <section className={rootClasses}>
          {this.renderEntities()}
        </section>
    )
  };
}

