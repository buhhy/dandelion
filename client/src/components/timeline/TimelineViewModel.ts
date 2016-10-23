import {TimelineModel} from 'models/timeline/TimelineModel';
import {EntityModel} from 'models/timeline/EntityModel';

class TimelineViewModel {
  readonly visibleEntities: TimelineEntityViewModel[] = [];

  private readonly changeStreamController = StreamController<TimelineEntityViewModel>();

  get changeStream(): Stream<TimeLineEntityViewModel> {
    return this.changeStreamController.stream;
  }

  addEntity(entity: TimelineEntityViewModel, {animate: bool = true}) {
    this.visibleEntities.push(entity);
  }
}

class TimelineEntityViewModel {
  constructor(public entity: EntityModel) {}
}
