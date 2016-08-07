import * as React from 'react';

const styles = require<any>('./ContentPanel.scss');

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
