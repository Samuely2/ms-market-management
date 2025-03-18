import random
import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()  
twilio_sid = os.getenv('TWILIO_ACCOUNT_SID')
twilio_auth_token = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_WHATSAPP_NUMBER = 'whatsapp:+14155238886'
DESTINATION_WHATSAPP_NUMBER = 'whatsapp:+5511947950771'

def sendMessage(code):
    try:
        client = Client(twilio_sid , twilio_auth_token)

        message = client.messages.create(
            from_='whatsapp:+14155238886',
            to=f'whatsapp:{DESTINATION_WHATSAPP_NUMBER}',  # Número dinâmico do usuário
            body=f"Seu código de ativação é: {code}"  # Mensagem formatada
        )

        print(f"Mensagem enviada com sucesso! SID: {message.sid}")
    except Exception as e:
        print(f"Erro ao enviar mensagem: {e}")


def generateNumber():
    return ''.join(str(random.randint(0, 9)) for _ in range(4))  

code = generateNumber()
sendMessage(code)
