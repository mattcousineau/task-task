import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { Employee } from './schemas/Employee';
import 'dotenv/config';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/task-task';

  const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
    secret: process.env.COOKIE_SECRET,
  };

  const { withAuth } = createAuth({
    listKey: 'Employee',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
      fields: ['employeeId', 'employeeName', 'password', 'position', 'department', 'email', 'phone'],
      // TODO: Add in inital roles here
    },
  });
  
  export default withAuth(
    config({
      // @ts-ignore
      server: {
        cors: {
          origin: [process.env.FRONTEND_URL],
          credentials: true,
        },
      },
      db: {
        adapter: 'mongoose',
        url: databaseURL,
        // TODO: Add data seeding here
      },
      lists: createSchema({
        // Schema items go in here
        Employee,
      }),
      ui: {
        // Show the UI only for poeple who pass this test
        isAccessAllowed: ({ session }) =>
          // console.log(session);
          !!session?.data,
      },
      session: withItemData(statelessSessions(sessionConfig), {
        // GraphQL Query
        Employee: 'employeeId employeeName email',
      }),
    })
  );
  