import {EntityModel} from "./EntityModel";

export class TimelineModel {
  readonly entities: EntityModel[] = [];

  addEntity(entity: EntityModel) {
    this.entities.push(entity);
  }
}
