import { SetMetadata } from '@nestjs/common';
import { Action } from './types/actions.enum';
import { Subject } from './types/subjects.type';

export interface Permission {
  action: Action;
  subject: Subject;
}
export const CHECK_PERMISSION = 'check_permission';
export const CheckPermission = (...permissions: Permission[]) =>
  SetMetadata(CHECK_PERMISSION, permissions);
