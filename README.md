# Fatec Estágios Queue Message Handler

This project is responsible for sending messages to FCM (Firebase Cloud Messaging) using Google APIs for Fatec estágios. It utilizes the amqplib library to handle message queues and ensure reliable delivery of notifications to devices.

## Prerequisites

Before setting up the project, make sure you have the following:

- Docker installed on your machine.

## Setup

### 1. Clone the project repository:

```bash
git clone git@github.com:lotaviods/link-fatec-push-consumer.git
```
### 2. Navigate to the project directory:

```bash
   cd fatec-estagios-queue-handler
```

### 3. Start the Docker containers:

```bash
   docker-compose up -d
```
   This command starts the necessary containers in detached mode, allowing the process to run in the background.

### 4. Set up the Firebase Admin SDK:

- Go to the Firebase console and create a new project or use an existing one.
- Enable Firebase Cloud Messaging for your project.
- Retrieve the following information from your Firebase project:
  - `projectId`
  - `clientEmail`
  - `privateKey`
- Set the corresponding environment variables in your local environment or in a `.env` file:
  - `LINK_FATEC_PUSH_CREDENTIALS_PROJECT_ID` - Set it to your Firebase project ID.
  - `LINK_FATEC_PUSH_CREDENTIALS_CLIENT_EMAIL` - Set it to the client email associated with your Firebase service account.
  - `LINK_FATEC_PUSH_CREDENTIALS_PRIVATE_KEY` - Set it to the private key associated with your Firebase service account.


## Usage
Once the project is set up, you can use it to send messages to FCM using the following format:

        {
            "title": "Fatec Estágios",
            "to": "device_token",
            "message": "Your message here"
        }

Make sure to replace "device_token" with the actual FCM device token you want to send the message to. The message field should contain the content of the notification.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.