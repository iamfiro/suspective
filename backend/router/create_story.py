import json
import os
from fastapi import FastAPI, APIRouter, HTTPException, Query
from openai import AsyncOpenAI as OpenAI
from dotenv import load_dotenv

from utils.path import get_path

router = APIRouter(
    prefix="/story",
    tags=["ai"],
)

load_dotenv()

openai = OpenAI(api_key=os.getenv("OPENAI_KEY"))

@router.get("/create")
async def create_story():
    try:
        with open("./utils/story_prompt.txt", "r") as file:
            prompt = file.read()

        response = await openai.chat.completions.create(
            model = os.getenv("MODEL_NAME"),
            messages = [
                {"role": "system", "content": prompt}
            ],
            max_tokens=4096,
            temperature=1
        )
        with open(get_path("story"),"w") as f:
            f.write(json.loads(response.choices[0].message.content))
        return {"response": response.choices[0].message.content}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


