
import ollama
from core.database import save_message, get_messages

async def get_chat_response(message: str, session_id: int):
    save_message(session_id, "user", message)
    messages = get_messages(session_id, 10)
    response = ollama.chat(
        model="qwen2.5:3b",
        messages=messages
    )
    ai_response = response["message"]["content"]
    save_message(session_id, "assistant", ai_response)
    return ai_response

