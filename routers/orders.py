from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import Order, OrderItem, Product, User
from database import get_db
from schemas import OrderCreate, OrderOut
from utils import get_current_user
from typing import List

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderOut)
async def create_order(order_data: OrderCreate, db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    total = 0
    items = []

    for item in order_data.items:
        product = await db.get(Product, item.product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Продукт не найден")
        total += product.price * item.quantity
        items.append(OrderItem(product_id=product.id, quantity=item.quantity))

    new_order = Order(user_id=user.id, total=total, items=items)
    db.add(new_order)
    await db.commit()
    await db.refresh(new_order)
    return new_order

@router.get("/", response_model=List[OrderOut])
async def user_orders(db: AsyncSession = Depends(get_db), user: User = Depends(get_current_user)):
    result = await db.execute(select(Order).where(Order.user_id == user.id))
    return result.scalars().all()
