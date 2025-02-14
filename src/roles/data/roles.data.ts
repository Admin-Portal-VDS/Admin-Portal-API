import { UserRole } from '../enums/user-role.enum';

export const roles = [
  { id: 1, name: UserRole.SUPER_USER, label: 'Super User' },
  {
    id: 2,
    name: UserRole.ACCOUNT_ADMINISTRATOR,
    label: 'Account Administrator',
  },
  {
    id: 3,
    name: UserRole.BILLING_ADMINISTRATOR,
    label: 'Billing Administrator',
  },
  {
    id: 4,
    name: UserRole.CALL_QUEUE_ADMINISTRATOR,
    label: 'Call Queue Administrator',
  },
  {
    id: 5,
    name: UserRole.CALL_QUEUE_REPORTING_ADMINISTRATOR,
    label: 'Call Queue Reporting Administrator',
  },
  {
    id: 6,
    name: UserRole.REPORTS_ADMINISTRATOR,
    label: 'Reports Administrator',
  },
  { id: 7, name: UserRole.USER_ADMINISTRATOR, label: 'User Administrator' },
  { id: 8, name: UserRole.END_USER, label: 'End User' },
  {
    id: 9,
    name: UserRole.END_USER_NO_DASHBOARD,
    label: 'End User (No Dashboard)',
  },
];
