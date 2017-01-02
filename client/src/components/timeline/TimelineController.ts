import {EntityModel} from 'models/timeline/EntityModel';
// Suggestion: Prefer project-absolute paths to relative paths, to ease
// reuse and refactoring.
import {Stream, StreamController} from 'common/Stream';

export class TimelineController {
  static readonly eventTypeNewEntity = 'add';
  static readonly eventTypeRepositionEntity = 'reposition';
  static readonly eventTypeRemoveEntity = 'remove';

  readonly visibleEntities: TimelineEntityModel[] = [];

  private readonly changeStreamController =
      new StreamController<TimelineEntityModel[]>();

  get changeStream(): Stream<TimelineEntityModel[]> {
    return this.changeStreamController.stream;
  }

  addEntities({entities, animate = true}: {entities: EntityModel[], animate?: boolean}) {
    const newEntities = entities.map((entity) =>
        new TimelineEntityModel({entity: entity, positionY: 0}));

    newEntities.forEach((newEntity) => this.visibleEntities.push(newEntity));
    this.changeStreamController.add(
        TimelineController.eventTypeNewEntity, newEntities);
  }
}

export class TimelineEntityModel {
  public readonly entity: EntityModel;
  public readonly positionY: number;

  constructor({entity, positionY}: {entity: EntityModel, positionY: number}) {
    this.entity = entity;
    this.positionY = positionY;
  }
}
