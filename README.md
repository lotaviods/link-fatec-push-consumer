# Project to handle queue messages Fatec estágios using amqplib

This app send messages to fcm using google apis for Fatec estágios


----
Using docker:

        docker-compose up -d
        
----


Message format: 
        {"title": "Fatec Estágios", "to": "device_token", "message": ""}
