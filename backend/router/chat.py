import json
import os
from fastapi import FastAPI, APIRouter, HTTPException, Query
from openai import AsyncOpenAI as OpenAI
from dotenv import load_dotenv

from utils.path import get_path

router = APIRouter(
    prefix="/chat",
    tags=["ai"],
)

load_dotenv()

openai = OpenAI(api_key=os.getenv("OPENAI_KEY"))


@router.post("/chat")
async def chat(
        user_prompt: str = Query(None, title="Prompt"),
        index: int = Query(None, title="Index")
):
    try:
        # Prompt 생성
        with open("./utils/story_prompt.txt", "r") as file:
            prompt = f"당신은 용의자 {index}입니다." + file.read()

        # OpenAI API 호출
        response = await openai.chat.completions.create(
            model=os.getenv("MODEL_NAME"),
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=4096,
            temperature=1
        )

        # 인공지능 응답 추출
        ai_response = response.choices[0].message.content

        # 파일 경로 설정
        file_path = get_path(f'suspect{index}.json')

        # 기존 대화 불러오기
        if os.path.exists(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    chat_history = json.load(f)  # 기존 대화 읽기
            except (json.JSONDecodeError, FileNotFoundError):
                chat_history = []  # 파일이 없거나 JSON 파싱 오류 시 초기화
        else:
            chat_history = []

        # 새로운 대화 추가
        new_entry = {
            "user": user_prompt,
            "ai": ai_response
        }
        chat_history.append(new_entry)

        # 업데이트된 대화 저장
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(chat_history, f, ensure_ascii=False, indent=4)  # 읽기 쉽게 저장

        return {"response": ai_response}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
