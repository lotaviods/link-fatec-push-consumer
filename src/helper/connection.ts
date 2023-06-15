import amqplib from 'amqplib/callback_api';
import * as dotenv from 'dotenv'
import admin from 'firebase-admin'

dotenv.config()
const queue = process.env.LINK_FATEC_PUSH_CONSUMER_QUEUE
const url = process.env.LINK_FATEC_PUSH_CONSUMER_URL

export function startConsumer(callback: (msg: amqplib.Message | null, channel: amqplib.Channel) => void) {
  admin.initializeApp({
    credential: admin.credential.cert({
      "projectId": process.env.LINK_FATEC_PUSH_CREDENTIALS_PROJECT_ID,
      "clientEmail": process.env.LINK_FATEC_PUSH_CREDENTIALS_CLIENT_EMAIL,
      "privateKey": process.env.LINK_FATEC_PUSH_CREDENTIALS_PRIVATE_KEY 
    })
  })

  amqplib.connect(`${url}`, (err: any, conn: amqplib.Connection) => {
    if (err) throw err;
    console.info(`[${new Date().toISOString()}] [Consumer] Connected!`);
    conn.createChannel((err, ch) => {
      if (err) throw err;
      ch.assertQueue(queue)
      console.info(`[${new Date().toISOString()}] [Consumer] Ready for messages!`);
      ch.consume(`${queue}`, (msg: amqplib.Message | null) => {
        try {
          callback(msg, ch)
        } catch (err) {
          console.log(err)
        }
      })
    })
  })
}