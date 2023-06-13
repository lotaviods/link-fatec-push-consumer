import * as dotenv from 'dotenv'
import { Message } from 'message'
import { TokenMessage, TopicMessage } from 'firebase-admin/lib/messaging/messaging-api'
import admin from 'firebase-admin'

dotenv.config()

export async function sendMessage(message: Message): Promise<any>{
    let fcmMessage: TokenMessage | TopicMessage | undefined = undefined

    if(message.token_device != undefined)
        fcmMessage = {
            "token": message.token_device,
            "notification": {
                "title": message.title,
                "body": message.body,
            }
        }

    if(fcmMessage != undefined)
        admin.messaging().send(fcmMessage);
}
