import EventStoreClient from 'event-store-client'
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
        return { firstName: args.firstName, lastName: args.lastName };
      }
    );
  }
}

export default CreatePatientHandler;
