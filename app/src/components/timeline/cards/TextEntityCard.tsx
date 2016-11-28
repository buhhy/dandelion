import * as React from 'react';
import * as styles from './TextEntityCard.scss';
import {EntityCardComponent} from "./EntityCard";
import {TextEntityModel} from "models/timeline/EntityModel";

export interface TextEntityCardViewModel {
  model: TextEntityModel;
}

export class TextEntityCardComponent
    extends React.Component<TextEntityCardViewModel, {}> {
  render(): JSX.Element {
    return (
        <EntityCardComponent>
          <section className={styles.contentContainer}>
            <div className={styles.icon}>
              <img
                  src={require<string>("./assets/icon_text.svg")}
                  className={styles.image} />
              <span className={styles.text}>TXT</span>
            </div>
            <div className={styles.content}>
              <h1 className={styles.header}>{this.props.model.title}</h1>
              <p className={styles.body}>{this.props.model.content}</p>
            </div>
          </section>
        </EntityCardComponent>
    );
  }
}