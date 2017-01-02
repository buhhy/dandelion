export class EntityModel {
  readonly id?: string;
  readonly draftId?: number;
  readonly createDate: Date;
  readonly modifyDate?: Date;
  readonly deleteDate?: Date;

  constructor(args: {
    id?: string,
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
    this.createDate = new Date(args.createDate);
    this.modifyDate = args.modifyDate == undefined ? undefined : new Date(args.modifyDate);
    this.deleteDate = args.deleteDate == undefined ? undefined : new Date(args.deleteDate);
  }

  get uniqueId(): string {
    return `${this.id}##${this.draftId}`
  }

  get createDateHash(): string {
    const d = this.createDate.getDate();
    const m = this.createDate.getMonth() + 1;
    const y = this.createDate.getFullYear();
    return `${y}${m < 10 ? `0${m}` : m}${d < 10 ? `0${d}` : d}`;
  }
}

export class TextEntityModel extends EntityModel {
  readonly title: string;
  readonly content: string;

  constructor(args: {
    id?: string,
    draftId?: number,
    createDate: number,
    modifyDate?: number,
    deleteDate?: number,
    title: string,
    content?: string
  }) {
    super(args);
    this.title = args.title;
    this.content = args.content || '';
  }
}


