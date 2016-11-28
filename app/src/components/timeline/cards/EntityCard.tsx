import * as React from 'react';
import * as styles from './EntityCard.scss';

export interface EntityCardModel {
  className?: String;
}

/**
 * Timeline card component for rendering existing entities.
 *
 * It renders the card UI with the content children and a view button on the
 * right side. The uploader name is annotated above the top left of the card
 * object.
 */
export class EntityCardComponent extends React.Component<EntityCardModel, {}> {
  public static defaultProps: EntityCardModel = {
    className: ''
  };

  render(): JSX.Element {
    return (
        <section className={`${this.props.className} ${styles.card}`}>
          <span className={styles.annotation}>Uploaded by ...</span>
          <div className={styles.content}>
            {this.props.children}
          </div>
          <button className={styles.viewButton}>
            <span className={styles.text}>View</span>
          </button>
        </section>
    );
  }
}