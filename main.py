from fastapi import FastAPI
from database import Base, engine
from routers import auth, products, orders

app = FastAPI(title="Hand&Bean API")

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)

@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
