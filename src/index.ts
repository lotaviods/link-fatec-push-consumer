
import { startConsumer } from "./helper/connection";
import amqplib from 'amqplib/callback_api';
import { sendMessage } from "./service/fcm_service";
import { Message } from "message";

console.info(`[${new Date().toISOString()}] [Consumer] Started!`);

startConsumer(async (msg: amqplib.Message | null, ch: amqplib.Channel) => {
        try {
            let json = JSON.parse(msg?.content.toString()!!)
            console.log(`[${new Date().toISOString()}] [Message received]: %s to user ${json.to}`, `${json.message}`)

            const message: Message = {
                token_device: json.to,
                body: json.message,
                title: json.title
            };
            
            await sendMessage(message)
            ch.ack(msg!!);
        } catch (e) {
            console.log(e)
        }
})