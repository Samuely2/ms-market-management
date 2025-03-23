import random
import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()  
twilio_sid = 'AC8bb321d902020f96a7ff7d2c3dd891d4'
twilio_auth_token = '367d16f039ef093cb6b474142c258356'

def sendMessage(code):
    try:
        client = Client(twilio_sid , twilio_auth_token)

        message = client.messages.create(
            from_='whatsapp:+14155238886',
            to=f'whatsapp:+5511947950771',
            body=f"Seu código de ativação é: {code}" 
        )

        print(f"Mensagem enviada com sucesso! SID: {message.sid}")
    except Exception as e:
        print(f"Erro ao enviar mensagem: {e}")


def generateNumber():
    return ''.join(str(random.randint(0, 9)) for _ in range(4))  

