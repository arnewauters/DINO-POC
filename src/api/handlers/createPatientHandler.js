import EventStoreClient from 'event-store-client'
import Promise from 'bluebird'
import _ from 'underscore'

class CreatePatientHandler {
  constructor(options) {
    this.connection = new EventStoreClient.Connection({
      host: '127.0.0.1',
      port: 1113,
      debug: true
    })
  }

  getStreamName(id) {
    return 'Patient-' + id;
  }

  handle(args) {
    return new Promise(function(resolve, reject) {
      let id = EventStoreClient.Connection.createGuid().toString('hex');

      this.connection.writeEvents(
        this.getStreamName(id),
        EventStoreClient.ExpectedVersion.NoStream,
        false,
        [{
          eventId: EventStoreClient.Connection.createGuid(),
          eventType: 'PatientCreated',
          data: _.extend(args, { id: id })
        }],
        null,
        (completed) => {
          console.log('Events written result: ' + EventStoreClient.OperationResult.getName(completed.result));
          this.connection.close();
          resolve({ firstName: args.firstName, lastName: args.lastName });
        }
      );
    }.bind(this));
  }
}

export default CreatePatientHandler;
