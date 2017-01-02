import * as React from "react";
import * as classNames from "classnames";
import {TimelineController, TimelineEntityModel} from './TimelineController';
import * as styles from "./DotLine.scss";
import * as d3 from "d3";
import {EntityModel} from '../../models/timeline/EntityModel';

export interface DotLineModel {
  className?: string;
  timelineModel: TimelineController;
}

interface DotLineState {
  entities: TimelineEntityModel[];
}

function isDomElement(instance: React.ReactInstance): instance is Element {
  return (instance as Element).addEventListener !== undefined;
}

export class DotLineComponent extends React.Component<DotLineModel, DotLineState> {
  private svgWidth: number = 80;
  private svgHeight: number = 80;
  // private svgElement: d3.Selection<any>;


  componentWillMount(): void {
    this.setState({
      entities: []
    });
  }

  componentDidMount(): void {
    // this.setUpSvg();
    if (this.props.timelineModel != null) {
      this.props.timelineModel.changeStream.listen(
          TimelineController.eventTypeNewEntity,
          (changes: TimelineEntityModel[]) => {
            console.log(changes.length);

            this.setState({
              entities: Array.from(this.props.timelineModel.visibleEntities)
            });
          });
    }
  }

  render(): JSX.Element {
    const rootClasses = classNames([this.props.className]);
    return (
        <nav className={rootClasses}>
          {this.renderBubbles()}
        </nav>
    );
  };

  private renderBubbles(): JSX.Element[] {
    return this.props.timelineModel.visibleEntities.map((entity) => {
      return (
          <div className={styles.bubbleContainer}>
            <svg
                className={styles.bubble}
                height={this.svgHeight}
                key={entity.entity.id}
                ref="svg"
                width={this.svgWidth}>
              <circle cx="40" cy="40" r="36" fill="#fafafa"></circle>
              <circle cx="40" cy="40" r="6" fill="#c9c9c9"></circle>
              <text x="40" y="28" className={styles.timeLabel} textAnchor="middle">
                6:00pm
              </text>
            </svg>
          </div>
      );
    });
  }

  private setUpSvg() {
    if (!isDomElement(this.refs['svg'])) return;
    // this.svgElement = d3.select(this.refs['svg'] as Element);
    // this.createBubbleElement();
  }

  // private updateDotLineSvg(): d3.Selection<any> {
  //   let root = this.svgElement.append('g');
  //
  //   root
  //       .append('circle').attr('cx', '40').attr('cy', '40')
  //       .attr('r', '36').attr('fill', '#fafafa');
  //   root
  //       .append('circle').attr('cx', '40').attr('cy', '40')
  //       .attr('r', '6').attr('fill', '#c9c9c9');
  //
  //   var text = root.append('text');
  //   text.html('6:00pm');
  //   text.attr('x', '40').attr('y', '28')
  //       .attr('text-anchor', 'middle').attr('class', styles.timeLabel);
  //
  //   return root;
  // }
}
