import EventStoreClient from 'event-store-client'

let connection = new EventStoreClient.Connection({
  host: '127.0.0.1',
  port: 1113,
  debug: true
})

connection.subscribeToStream(
  '',
  false,
  (storedEvent) => {
    console.log('event stored: ' + JSON.stringify(storedEvent.data));
  },
  (subscriptionConfirmation) => { 
    console.log('listening to events');
  },
  (subscriptionDropped) => {
    console.log('worker dropped. sigkill? ' + subscriptionDropped.reason);
  },
  { username: 'admin', password: 'changeit' }
);
