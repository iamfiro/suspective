from pydantic import BaseModel

class ChatMessage(BaseModel):
    user_message: str
    ai_response: str
    ai_persona: int