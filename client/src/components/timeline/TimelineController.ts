import {EntityModel} from 'models/timeline/EntityModel';
import {Stream, StreamController} from '../../common/Stream';

export class TimelineController {
  static readonly eventTypeNewEntity = 'add';
  static readonly eventTypeRepositionEntity = 'reposition';
  static readonly eventTypeRemoveEntity = 'remove';

  readonly visibleEntities: TimelineEntityModel[] = [];

  private readonly changeStreamController =
      new StreamController<TimelineEntityModel>();

  get changeStream(): Stream<TimelineEntityModel> {
    return this.changeStreamController.stream;
  }

  addEntity({entity, animate = true}: {entity: EntityModel, animate?: boolean}) {
    var newEntity = new TimelineEntityModel({entity: entity, positionY: 0});

    this.visibleEntities.push(newEntity);
    this.changeStreamController.add(
        TimelineController.eventTypeNewEntity, newEntity);
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
