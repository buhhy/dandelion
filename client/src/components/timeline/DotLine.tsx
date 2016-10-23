import * as React from "react";
import * as classNames from "classnames";
import {TimelineController} from './TimelineController';
// import * as styles from "./DotLine.scss";

export interface DotLineModel {
  className?: string
  timelineModel?: TimelineController
}

export class DotLineComponent extends React.Component<DotLineModel, {}> {
  public static defaultProps: DotLineModel = {
    className: ''
  };

  componentDidMount(): void {
    if (this.props.timelineModel != null) {
      this.props.timelineModel.changeStream.listen(
          TimelineController.eventTypeNewEntity,
          (model) => {
            console.log(model.entity.createDate);
          });
    }
  }

  render(): JSX.Element {
    var rootClasses = classNames(this.props.className);
    return (
        <nav className={rootClasses}>

        </nav>
    )
  };
}
