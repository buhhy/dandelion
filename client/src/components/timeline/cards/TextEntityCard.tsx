import * as React from 'react';
import * as styles from './TextEntityCard.scss';
import {EntityCardComponent} from "./EntityCard";

export interface TextEntityCardModel {
}

export class TextEntityCardComponent
    extends React.Component<TextEntityCardModel, {}> {
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
              <h1 className={styles.header}>Cool text</h1>
              <p className={styles.body}>Lorem ipsum</p>
            </div>
          </section>
        </EntityCardComponent>
    );
  }
}