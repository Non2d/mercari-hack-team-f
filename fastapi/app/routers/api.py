import base64

from fastapi import APIRouter, Depends, File, UploadFile
from db import get_db
from models.products import Product
from models.buyer import SearchHistory
from pydantic import BaseModel, Field, HttpUrl
from log_conf import logger
from openai import OpenAI
import openai
import base64
from pydantic import BaseModel
import os
# from PIL import Image
import json
import requests
from urllib.parse import quote
from dotenv import load_dotenv
# api schema
from typing import List, Optional
from pydantic import BaseModel, Field, HttpUrl
import enum
# openai api
import os
from openai import AsyncOpenAI

# api schema
class TestProductCreate(BaseModel):
    name: str
    description: str
    price: int
    category: str

class UserCreate(BaseModel):
    uid: str
    name: str
    email: str

# routers
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select
from sqlalchemy.orm import relationship

router = APIRouter()

# db models
from db import Base
from sqlalchemy import Column, Integer, String

class User(Base):
    __tablename__ = "users"
    uid = Column(String(255), primary_key=True, index=True)
    name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)

    # products = relationship('Product', back_populates='user')

## products (test)
# @router.get("/test-products")
# async def read_products(db: AsyncSession = Depends(get_db)):
#     result = await db.execute(select(TestProduct))
#     db_products = result.scalars().all()
#     return db_products
#
# @router.post("/test-product")
# async def create_product(product: TestProductCreate, db: AsyncSession = Depends(get_db)):
#     db_product = TestProduct(
#         name=product.name,
#         description=product.description,
#         price=product.price,
#         category=product.category
#     )
#     db.add(db_product)
#     await db.commit()
#     await db.refresh(db_product)
#     return db_product

## users
@router.get("/users")
async def read_user(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    db_users = result.scalars().all()
    return db_users

@router.post("/user")
async def find_or_create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    # uidでユーザーを探す
    result = await db.execute(select(User).where(User.uid == user.uid))
    db_user = result.scalars().first()

    if db_user:
        # すでに存在する場合、そのユーザー情報を返し、200 OKを返す
        return {"message": "User already exists", "user": db_user}

    # ユーザーが存在しない場合、新しく作成
    new_user = User(
        uid=user.uid,
        name=user.name,
        email=user.email
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    # 新しいユーザーが作成されたので、201 Createdを返す
    return {"message": "New user created", "user": new_user}, 201


load_dotenv()
client=AsyncOpenAI()

@router.get("/openai")
async def get_openai():
    completion = await client.chat.completions.create(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "user", "content": "Who is Shohei Ohtani?"}
    ]
    )

    logger.info(completion.choices[0].message)
    return {"message": completion.choices[0].message.content}

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


# Upload Image
@router.post("/upload")
async def create_upload_file(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    with open(f"static/{file.filename}", "wb") as buffer:
        data = await file.read()
        buffer.write(data)

    result = sentToOpenai(base64.b64encode(data).decode("utf-8"))
    # - book_list
    #  - item x
    #     - title
    #     - image_url
    #     - count
    # 1-3 easy to sell
    # 4-8 maybe sold
    # 9-  useless

    book_list = []
    for book in result:
        title = book['title']
        image_url = book['image_url']

        # Get the count
        count_result = await db.execute(select(SearchHistory.count).where(SearchHistory.query==title))
        count = count_result.scalars().first()
        if count is None:
            count = 0

        book_list.append((count, image_url, title))

    book_list.sort(key=lambda x: x[0], reverse=True)

    response = {}
    cnt = 1
    for item in book_list:
        new_item = {}
        new_item['title'] = item[2]
        new_item['image_url'] = item[1]
        new_item['count'] = item[0]
        response[f'item{cnt}'] = new_item
        cnt += 1

    json_data = json.dumps(response, ensure_ascii=False)

    return json_data


def sentToOpenai(image):
    load_dotenv()

    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

    # 縦向きの画像が来ることを想定するため，いらないかも
    # def rotate_image(file_path):
    #     with Image.open(file_path) as img:
    #         width, height = img.size
    #         if width > height:
    #             # 横向きの画像を90度回転
    #             rotated_img = img.rotate(-90, expand=True)
    #             # 回転した画像を保存（元のファイルを上書きします）
    #             rotated_img.save(file_path)
    #         else:
    #             # 縦向きの画像はそのまま
    #             pass

    # GPT-4oを使用して，画像から本のタイトルと著者を抽出
    def book_ocr(input_image):
        # Open the image file and encode it as a base64 string
        # def encode_image(image_path):
        #     with open(image_path, "rb") as image_file:
        #         return base64.b64encode(image_file.read()).decode("utf-8")

        base64_image = input_image

        # Set the API key and model name
        MODEL = "gpt-4o"
        client = OpenAI(api_key=OPENAI_API_KEY)

        class book_metadata(BaseModel):
            title: str

        class titles(BaseModel):
            title: list[book_metadata]

        response = client.beta.chat.completions.parse(
            model=MODEL,
            messages=[
                {"role": "system", "content": "この画像にある本のタイトルを抽出してください．"},
                {"role": "user", "content": [
                    {"type": "image_url", "image_url": {
                        "url": f"data:image/jpg;base64,{base64_image}",
                        "detail": "high"}
                     }
                ]}
            ],
            tools=[openai.pydantic_function_tool(titles)],
            temperature=0.0,
        )

        tags_json = response.choices[0].message.tool_calls[0].function.arguments
        return tags_json

    def get_book_info(tags_json):
        # Parse the JSON response to extract titles and authors
        book_data = json.loads(tags_json)
        ret = []

        # Iterate over each book and query the Google Books API
        for book in book_data['title']:
            new_item = {}
            title = book['title']
            print(f"Searching for Title: {title}")

            # Construct the query and encode it
            query = f"intitle:{title}"
            encoded_query = quote(query)
            url = f"https://www.googleapis.com/books/v1/volumes?q={encoded_query}"

            # Make the request to the Google Books API
            response = requests.get(url)
            if response.status_code == 200:
                book_info = response.json()
                # Check if any items were found
                if 'items' in book_info and len(book_info['items']) > 0:
                    # Get the first item
                    item = book_info['items'][0]
                    volume_info = item['volumeInfo']
                    new_item['title'] = book['title']
                    new_item['image_url'] = volume_info.get('imageLinks', {}).get('thumbnail', 'N/A')
                else:
                    new_item['title'] = title
                    new_item['image_url'] = ""
                    print("No results found for this book.")
            else:
                print(f"Failed to retrieve data from Google Books API. Status code: {response.status_code}")
            ret.append(new_item)

        return ret


    # 画像を正しい向きに回転
    # rotate_image(image)
    # 画像からテキストを抽出
    tags_json = book_ocr(image)
    # Google Books APIを使用して書籍情報を取得
    book_info = get_book_info(tags_json)

    return book_info


# ProductStatus Enum（Pydantic用）
class ProductStatusEnum(str, enum.Enum):
    DRAFT = 'draft'
    PUBLISHED = 'published'

# Product作成用スキーマ
class ProductCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    userId: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    price: Optional[int] = Field(None)
    status: Optional[ProductStatusEnum] = Field(ProductStatusEnum.DRAFT)
    image_url: HttpUrl
    demand: Optional[int] = Field(None)

    class Config:
        orm_mode = True

# レスポンス用スキーマ（必要に応じて）
class ProductResponse(BaseModel):
    ProductID: int
    Title: str
    Description: Optional[str]
    Price: float
    Status: ProductStatusEnum
    ImageURL: HttpUrl
    demand: Optional[int]

    class Config:
        orm_mode = True
# app/routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from typing import List
import logging


router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/products", status_code=status.HTTP_201_CREATED, response_model=List[ProductResponse])
async def register_products(
    products: List[ProductCreate],
    db: AsyncSession = Depends(get_db),
):
    db_products = []
    try:
        for product in products:
            # ユーザーの存在を確認
            result = await db.execute(select(User).where(User.uid == product.userId))
            user = result.scalars().first()
            if not user:
                # ユーザーが存在しない場合は作成
                user = User(uid=product.userId)
                db.add(user)
                await db.commit()
                await db.refresh(user)
            
            db_product = Product(
                UserID=product.userId,
                Title=product.title,
                Description=product.description,
                Price=product.price,
                Status=product.status.value,  # Enumの場合
                ImageURL=product.image_url,
                demand=product.demand
            )
            db_products.append(db_product)
        
        db.add_all(db_products)
        await db.commit()
        for db_product in db_products:
            await db.refresh(db_product)
        
        return db_products
    except SQLAlchemyError as e:
        await db.rollback()
        logger.error(f"SQLAlchemyError: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail= str(e)
        )
    
# 商品一覧取得

# 
@router.get("/products", response_model=List[ProductResponse])
async def get_products(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product))
    db_products = result.scalars().all()
    return db_products

