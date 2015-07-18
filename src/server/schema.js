import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql/lib/type';

import CreatePatientHandler from './handlers/createPatientHandler'

var patientType = new GraphQLObjectType({
  name: 'Patient',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the patient.',
      resolve: function(p) {
        return p.id;
      }
    },
    firstName: {
      type: GraphQLString,
      description: 'The first name of the patient.'
    },
    lastName: {
      type: GraphQLString,
      description: 'The last name of the patient.',
      resolve: function(p) {
        return p.lastName;
      }
    }
  }
});

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: ({
      patient: {
        type: patientType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function() {
          return { firstName: "Arne", lastName: "Wauters" };
        }
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createPatient: {
        type: patientType,
        args: {
          firstName: {
            name: 'firstName',
            type: GraphQLString
          },
          lastName: {
            name: 'lastName',
            type: GraphQLString
          }
        },
        resolve: function(obj, args) {
          return new CreatePatientHandler().handle(args);
        }
      }
    }
  })
});

export default schema;
