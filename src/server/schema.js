import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql/lib/type';

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
      description: 'The first name of the patient.',
      resolve: function(p) {
        return p.firstName;
      }
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
  })
});

export default schema;
