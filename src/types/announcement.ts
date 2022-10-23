import { BaseType } from './base';
import { IProperty } from './property';

export interface IAnnouncement extends BaseType {
  id: number;
  subject: string;
  content: string;
  attachments: Array<string>;
  status: string;
  published_at: Date;
  target_segment: string;
  target: Array<number>;
  property: IProperty;
}
