/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from '@keystone-6/core';
import {isLoggedIn, isUsersItem, isUserAdmin} from './access'

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  checkbox
} from '@keystone-6/core/fields';
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from '@keystone-6/fields-document';

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from '.keystone/types';

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
  // ====== User Schema ======
  User: list({
    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      // The password field takes care of hiding details and hashing values
      password: password({ validation: { isRequired: true } }),
      answer: relationship({ ref: 'Answer.user', many: true}),
      isAdmin: checkbox()
    },
    access: {
      operation: {
        query: () => true,
        create: () => true,
        delete: ({session}) => isUserAdmin(session)
      },
      filter: {
        update: ({session}) => isUsersItem(session)
      }
    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
    ui: {
      labelField: 'name',
      listView: {
        initialColumns: ['name','email'],
      },
    },
  }),
  // ====== Question Schema ======
  Question: list({
    fields: {
      question: text({ validation: { isRequired: true}}),
      type: relationship({ ref: 'Type.question'}),
      // This is the relationship field mentioned in the note of the Answers
      // table that we created to form a link between the 2 tables
      answer: relationship({ ref: 'Answer.question', many: true })
    },
    access: {
      operation: {
        query: () => true,
        create: ({session}) => isUserAdmin(session),
        delete: ({session}) => isUserAdmin(session),
        update: ({session}) => isUserAdmin(session)
      }
    },
    ui: {
      labelField: 'question',
      listView: {
        initialColumns: ['question', 'type']
      }
    },
  }),
  // ====== Answers Schema ======
  Answer: list({
    fields: {
      answer: integer({ validation: {isRequired: true}}),
      user: relationship({ ref: 'User.answer'}),
      // When making a relationship field, you must create a corresponding
      // relationship field back the other way in the referenced table.
      question: relationship({ ref: 'Question.answer'}),
    },
    access: {
      operation: {
        query: ({session}) => isLoggedIn(session),
        create: ({session}) => isLoggedIn(session),
      },
      filter: {
        delete: ({session}) => isUsersItem(session),
        update: ({session}) => isUsersItem(session)
      }
    },
    ui: {
      labelField: 'answer',
      listView: {
        initialColumns: ['answer', 'user', 'question']
      }
    },
  }),
  // ====== Type Schema ======
  Type: list({
    fields: {
      type: integer({ validation: {isRequired: true}}),
      subheading: text(),
      description: text({ ui: {displayMode: 'textarea'}}),
      question: relationship({ref: 'Question.type', many: true})
    },
    access: {
      operation: {
        query: () => true,
        create: ({session}) => isUserAdmin(session),
        delete: ({session}) => isUserAdmin(session),
        update: ({session}) => isUserAdmin(session)
      }
    },
    ui: {
      // This will change what we see in dropdowns for selecting type like when you
      // are creating a new question and need to select which type that question is
      // related to for example.
      labelField: 'type',
      // This will change the columns and the order that they are displayed in when
      // looking at the records of one of the tables.
      listView: {
        initialColumns: ['type', 'subheading']
      }
    },
  })
};
