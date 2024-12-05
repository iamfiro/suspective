import os
from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends, Query
from openai import AsyncOpenAI as OpenAI
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

from utils.log import Logger

router = APIRouter(
    prefix="/ai_person",
    tags=["AI Person"],
)

# MongoDB 설정
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGODB_URL)
db = client.ai_chat_db
chat_collection = db.chat_history

# OpenAI 설정
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
model = "gpt-4-0613"

# AI 페르소나 정의
AI_PERSONAS = {
    1: "당신은 20대 여성 대학생입니다. 발랄하고 friendly한 성격으로 대화해주세요.",
    2: "당신은 40대 남성 회사원입니다. 진중하고 차분한 성격으로 대화해주세요.",
    3: "당신은 10대 고등학생입니다. 활기차고 귀여운 성격으로 대화해주세요.",
    # 필요한 만큼 페르소나 추가
}


class ChatMessage(BaseModel):
    user_message: str
    ai_response: str
    ai_persona: int
    timestamp: datetime


async def save_chat_history(message: str, response: str, current_ai: int):
    chat_record = {
        "user_message": message,
        "ai_response": response,
        "ai_persona": current_ai,
        "timestamp": datetime.utcnow()
    }
    await chat_collection.insert_one(chat_record)


async def get_chat_history(current_ai: int, limit: int = 5) -> List[ChatMessage]:
    cursor = chat_collection.find({"ai_persona": current_ai})
    cursor = cursor.sort("timestamp", -1).limit(limit)
    history = await cursor.to_list(length=limit)
    return [ChatMessage(**msg) for msg in history]


async def generate_ai_response(message: str, current_ai: int) -> str:
    try:
        # AI 페르소나 가져오기
        persona = AI_PERSONAS.get(current_ai)
        if not persona:
            raise HTTPException(status_code=400, detail="Invalid AI persona selected")

        # 이전 대화 기록 가져오기
        history = await get_chat_history(current_ai, limit=3)

        # 시스템 메시지와 대화 기록을 포함한 메시지 구성
        messages = [
            {"role": "system", "content": persona}
        ]

        # 이전 대화 기록 추가
        for chat in reversed(history):
            messages.extend([
                {"role": "user", "content": chat.user_message},
                {"role": "assistant", "content": chat.ai_response}
            ])

        # 현재 메시지 추가
        messages.append({"role": "user", "content": message})

        response = await openai_client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=200,
            temperature=0.7,
        )

        return response.choices[0].message.content

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while chatting with AI: {str(e)}")


@router.get("/chat")
async def chat(
        message: str = Query(..., title="Message to chat with AI"),
        current_ai: int = Query(..., title="Current AI index"),
):
    try:
        # AI 응답 생성
        response = await generate_ai_response(message, current_ai)

        # 대화 기록 저장
        await save_chat_history(message, response, current_ai)

        return {"response": response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while chatting with AI: {str(e)}")


@router.get("/history")
async def get_history(
        current_ai: int = Query(..., title="Current AI index"),
        limit: int = Query(default=5, title="Number of messages to retrieve")
):
    try:
        history = await get_chat_history(current_ai, limit)
        return {"history": history}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while retrieving chat history: {str(e)}")