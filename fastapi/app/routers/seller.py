from fastapi import APIRouter, Depends
from db import get_db
from pydantic import BaseModel
from log_conf import logger

from models.buyer import SearchHistory


# api schema
class ProductTagsCreate(BaseModel):
    tags: list[str]

# routers
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select

router = APIRouter()

# openai api
import os
from dotenv import load_dotenv
from openai import AsyncOpenAI
from typing import List

load_dotenv()
client=AsyncOpenAI()

@router.post("/openai2")
async def get_openai(tags: List[str], db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SearchHistory))
    db_search_history = result.scalars().all()
    db_search_history_str = ", ".join([f"{item.query}: {item.count}" for item in db_search_history])

    completion = await client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": f"{db_search_history_str} is the list of mercari's search history recently. Please judge whether items with tags: {tags} will sell. If so, please provide a reason."}
    ]
    )

    logger.info(completion.choices[0].message) #logにはcontent以外も載せておく
    return {"message": completion.choices[0].message.content}
    # return {"tags":tags, "db_search_history": db_search_history}

class Step(BaseModel):
    explanation: str
    output: str

class MathReasoning(BaseModel):
    steps: list[Step]
    final_answer: str

@router.get("/openai/math")
async def get_openai_math():
    completion = await client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "You are a helpful math tutor. Guide the user through the solution step by step."},
        {"role": "user", "content": "how can I solve 8x + 7 = -23"}
    ],
    response_format=MathReasoning,
    )
    math_reasoning = completion.choices[0].message.parsed
    return math_reasoning