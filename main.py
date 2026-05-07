from fastapi import FastAPI
from contextlib import asynccontextmanager
from api.routes import chat
from api.routes import session
from core.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

app.include_router(chat.router)

app.include_router(session.router)

