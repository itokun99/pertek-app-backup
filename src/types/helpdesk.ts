import { BaseType } from './base';
import { IProperty } from './property';

export interface IHelpdesk extends BaseType {
  id: number;
  subject: string;
  content: string;
  attachments: Array<string>;
  status: string;
  assignee: any;
  property: IProperty;
}
