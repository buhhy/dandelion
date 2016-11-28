import * as React from 'react';
import * as d3Select from 'd3-selection';
import * as d3Timer from 'd3-timer';
import * as d3Array from 'd3-array';
import * as styles from './Timeline.scss';
import {TextEntityCardComponent} from './cards/TextEntityCard';
import {NewEntityCardComponent} from './cards/NewEntityCard';
import {TextEntityModel, EntityModel} from 'models/timeline/EntityModel';
import {DotLineComponent} from './DotLine';
import {TimelineController, TimelineEntityModel} from './TimelineController';
import autobind = require("autobind-decorator");

export interface TimelineComponentModel {
  model?: TimelineController;
}

function isDomElement(instance: React.ReactInstance): instance is Element {
  return (instance as Element).addEventListener !== undefined;
}

export class TimelineComponent
    extends React.Component<TimelineComponentModel, {}> {

  public static defaultProps: TimelineComponentModel = {
    model: new TimelineController()
  };

  @autobind
  onCreateEntity(newEntity: EntityModel): void {
    if (this.props.model != undefined) {
      this.props.model.addEntity({entity: newEntity});
      this.forceUpdate();
    }
  }

  render(): JSX.Element {
    return (
        <article className={styles.container}>
          <DotLineComponent
              className={styles.chronology}
              timelineModel={this.props.model} />
          <section className={styles.cardStack}>
            <NewEntityCardComponent onCreateEntity={this.onCreateEntity} />
            {
              (() => {
                if (this.props.model == undefined) return null;
                return this.props.model.visibleEntities.map((entityModel) => {
                  var entity = entityModel.entity;
                  if (entity instanceof TextEntityModel) {
                    return (
                        <TextEntityCardComponent
                            key={entity.uniqueId}
                            model={entity} />
                    );
                  }
                  return null;
                });
              })()
            }
          </section>
          <svg height="300" width="800" ref="svg" />
        </article>
    );
  }

  componentDidMount(): void {
    if (!isDomElement(this.refs['svg'])) return;

    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    var svg = d3Select.select(this.refs['svg'] as Element),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");

    function update(data: String[]) {
      // DATA JOIN
      // Join new data with old elements, if any.
      var text = g.selectAll("text")
          .data(data);

      // UPDATE
      // Update old elements as needed.
      text.attr("class", "update");

      // ENTER
      // Create new elements as needed.
      //
      // ENTER + UPDATE
      // After merging the entered elements with the update selection,
      // apply operations to both.
      text.enter().append("text")
          .attr("class", "enter")
          .attr("x", function(d, i) { return i * 32; })
          .attr("dy", ".35em")
          .merge(text)
          .text(function (d: string) { return d; });

      // EXIT
      // Remove old elements as needed.
      text.exit().remove();
    }

// The initial display.
    update(alphabet);

// Grab a random sample of letters from the alphabet, in alphabetical order.
    d3Timer.interval(function() {
      update(d3Array.shuffle(alphabet)
          .slice(0, Math.floor(Math.random() * 26))
          .sort());
    }, 1500);
  }
}