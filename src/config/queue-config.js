const ampqlib = require("amqplib");
const { EmailService } = require("../services");
const ServerConfig = require('./server-config')

let connection, channel;

async function connectQueue() {
  try {
    connection = await ampqlib.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertQueue(ServerConfig.MESSAGE_QUEUE);
    console.log("Queue is Up");
  } catch (error) {
    console.log(error);
  }
}

function consumeQueue() {
  try {
    channel.consume(ServerConfig.MESSAGE_QUEUE, async (data) => {
       const object = JSON.parse(`${Buffer.from(data.content)}`);

       await EmailService.sendEmail(
         ServerConfig.GMAIL_EMAIL,
         object.recipientEmail,
         object.subject,
         object.text
       );
       channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
    connectQueue,
    consumeQueue
}