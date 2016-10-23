import * as React from "react";
import * as classNames from "classnames";
// import * as styles from "./DotLine.scss";
import {TimelineViewModel} from './Timeline';

export interface DotLineModel {
  className?: string
  timelineModel?: TimelineViewModel
}

export class DotLineComponent extends React.Component<DotLineModel, {}> {
  public static defaultProps: DotLineModel = {
    className: ''
  };

  render(): JSX.Element {
    var rootClasses = classNames(this.props.className);
    return (
        <nav className={rootClasses}>

        </nav>
    )
  };
}
