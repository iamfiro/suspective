import os

from fastapi import APIRouter, HTTPException, Depends,Query
from openai import AsyncOpenAI as OpenAI

from utils.log import Logger

# logger = Logger.create(__name__, level=logging.DEBUG)

router = APIRouter(
    prefix="/ai_person",
    tags=["AI Person"],
)


client = OpenAI()
OpenAI.api_key = os.getenv()
model = "gpt-4o-mini-2024-07-18"


async def chat(message : str, current_ai : int):
    try:
        response = await client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "만약 자신이 "},
                {"role": "user", "content": message},
            ],
            max_tokens=200,
            temperature=0.7,

        )
        response = response.choices[0].message.content
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while chatting with AI: {str(e)}")



@router.get("/chat")
async def chat(
        message : str =  Query(..., title="Message to chat with AI"),
        current_ai : int = Query(..., title="Current AI index"),
):
    try:
        response = await chat(message, current_ai)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while chatting with AI: {str(e)}")