import random
import os
from twilio.rest import Client

ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID', 'AC8bb321d902020f96a7ff7d2c3dd891d4')
AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN', '367d16f039ef093cb6b474142c258356')
TWILIO_WHATSAPP_NUMBER = 'whatsapp:+14155238886'
DESTINATION_WHATSAPP_NUMBER = 'whatsapp:+5511947950771'

def sendMessage(code):
    try:
        client = Client(ACCOUNT_SID, AUTH_TOKEN)

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
