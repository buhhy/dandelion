import * as React from "react";
import * as classNames from "classnames";
import {TimelineController, TimelineEntityModel} from './TimelineController';
import * as styles from "./DotLine.scss";
import * as d3 from "d3";

export interface DotLineModel {
  className?: string
  timelineModel?: TimelineController
}

function isDomElement(instance: React.ReactInstance): instance is Element {
  return (instance as Element).addEventListener !== undefined;
}

export class DotLineComponent extends React.Component<DotLineModel, {}> {
  private svgWidth: number = 200;
  private svgHeight: number = 200;
  private svgElement: d3.Selection<any>;

  public static defaultProps: DotLineModel = {
    className: ''
  };

  componentDidMount(): void {
    this.setUpSvg();
    if (this.props.timelineModel != null) {
      this.props.timelineModel.changeStream.listen(
          TimelineController.eventTypeNewEntity,
          (model: TimelineEntityModel) => {
            console.log(model.entity.createDate);
          });
    }
  }

  render(): JSX.Element {
    var rootClasses = classNames(this.props.className);
    return (
        <nav className={rootClasses}>
          <svg width={this.svgWidth} height={this.svgHeight} ref="svg">
            {/*<circle cx="40" cy="40" r="36" fill="#fafafa"></circle>*/}
            {/*<circle cx="40" cy="40" r="6" fill="#c9c9c9"></circle>*/}
            {/*<text x="40" y="28" className={styles.timeLabel} textAnchor="middle">*/}
              {/*6:00pm*/}
            {/*</text>*/}
          </svg>
        </nav>
    )
  };

  private setUpSvg() {
    if (!isDomElement(this.refs['svg'])) return;
    this.svgElement = d3.select(this.refs['svg'] as Element);
    this.createBubbleElement();
  }

  private updateDotLineSvg(): d3.Selection<any> {


    let root = this.svgElement.append('g');

    root
        .append('circle').attr('cx', '40').attr('cy', '40')
        .attr('r', '36').attr('fill', '#fafafa');
    root
        .append('circle').attr('cx', '40').attr('cy', '40')
        .attr('r', '6').attr('fill', '#c9c9c9');

    var text = root.append('text');
    text.html('6:00pm');
    text.attr('x', '40').attr('y', '28')
        .attr('text-anchor', 'middle').attr('class', styles.timeLabel);

    return root;
  }
}
