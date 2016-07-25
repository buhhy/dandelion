import * as React from 'react';
import * as classNames from 'classnames';

var styles = require('./content_panel.scss');

export interface ContentPanelModel {
  className?: String
}

export class ContentPanelComponent extends React.Component<ContentPanelModel, {}> {
  public static defaultProps: ContentPanelModel = {
    className: ''
  };

  render(): JSX.Element {
    return (
        <section className={classNames([this.props.className, styles.panel])}>
        </section>
    )
  }
}

