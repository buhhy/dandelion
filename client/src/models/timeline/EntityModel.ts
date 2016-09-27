export class EntityModel {
  readonly id?: number;
  readonly draftId?: number;
  readonly createDate: number;
  readonly modifyDate?: number;
  readonly deleteDate?: number;

  constructor(args: {
    id?: number,
    draftId?: number,
    createDate: number,
    modifyDate?: number,
    deleteDate?: number,
  }) {
    if (args.draftId == undefined && args.id == undefined) {
      throw new Error('Either draft ID or ID required');
    }

    this.id = args.id;
    this.draftId = args.draftId;
    this.createDate = args.createDate;
    this.modifyDate = args.modifyDate;
    this.deleteDate = args.deleteDate;
  }

  uniqueId(): string {
    return `${this.id}##${this.draftId}`
  }
}

export class TextEntityModel extends EntityModel {
  readonly title: string;
  readonly content: string;

  constructor(args: {
    id?: number,
    draftId?: number,
    createDate: number,
    modifyDate?: number,
    deleteDate?: number,
    title: string,
    content?: string
  }) {
    super(args);
    this.title = args.title;
    this.content = args.content;
  }
}
