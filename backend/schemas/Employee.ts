import { list } from '@keystone-next/keystone/schema';
import { password, text } from '@keystone-next/fields';

export const Employee = list({
  // access:
  // ui
  fields: {
    employeeId: text({ isRequired: true, isUnique: true }),
    employeeName: text({ isRequired: true }),
    password: password(),
    position: text({ isRequired: true }),
    department: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    phone: text({ isRequired: true }),
  },
});
