import * as React from 'react';
import * as styles from "./ContentPanel.scss";
import {TimelineComponent} from "../timeline/Timeline";

export interface ContentPanelModel {
  className?: String
}

export class ContentPanelComponent
    extends React.Component<ContentPanelModel, {}> {
  public static defaultProps: ContentPanelModel = {
    className: ''
  };

  render(): JSX.Element {
    return (
        <section className={`${this.props.className} ${styles.panel}`}>
          <TimelineComponent />
        </section>
    )
  }
}
