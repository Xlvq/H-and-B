from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
    is_admin: bool

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class ProductOut(BaseModel):
    id: int
    title: str
    description: str
    price: int
    image_url: str

    class Config:
        orm_mode = True

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]

class OrderItemOut(BaseModel):
    product_id: int
    quantity: int

    class Config:
        orm_mode = True

class OrderOut(BaseModel):
    id: int
    status: str
    total: int
    items: List[OrderItemOut]

    class Config:
        orm_mode = True
