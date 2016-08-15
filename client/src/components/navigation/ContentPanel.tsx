import * as React from 'react';
import * as styles from "./ContentPanel.scss";

export interface ContentPanelModel {
  className?: String
}

export class ContentPanelComponent extends React.Component<ContentPanelModel, {}> {
  public static defaultProps: ContentPanelModel = {
    className: ''
  };

  render(): JSX.Element {
    return (
        <section className={`${this.props.className} ${styles.panel}`} />
    )
  }
}
