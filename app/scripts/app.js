
// app.js
let client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', setupApp);
  client.events.on('onCallCreate', onCallCreateHandler);
}

function setupApp() {
  // Bind the 'click' event of the 'Close' button to a function that closes the popup
  document.getElementById('closeButton').addEventListener('click', function() {
    // Use 'client.interface.trigger' with the 'hide' method to close the popup
    client.interface.trigger('hide', { id: 'closeButton' });
  });
}

// Define a function to handle the 'onCallCreate' event
function onCallCreateHandler(event) {
  // Use 'client.interface.trigger' to open the popup page
  client.interface.trigger('show', { id: 'onCallCreate' });
  // Display call information in the notification card
  const callDetails = event.helper.getData();
  const notificationCard = document.querySelector('.notification_card p');
  notificationCard.textContent = `Call from: ${callDetails.call.phone_number}`;
}
