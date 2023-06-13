
import { startConsumer } from "./helper/connection";
import amqplib from 'amqplib/callback_api';
import { sendMessage } from "./service/fcm_service";
import { Message } from "message";


startConsumer(async (msg: amqplib.Message | null, ch: amqplib.Channel) => {
        console.log('[Consumer] Started!')
        try {
            let json = JSON.parse(msg?.content.toString()!!)
            console.log(`[x] Message received: %s to user ${json.to}`, `${json.message}`)

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