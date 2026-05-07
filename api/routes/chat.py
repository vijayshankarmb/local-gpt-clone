from fastapi import APIRouter
from schemas.chat import ChatRequest
from services.llm_service import get_chat_response

router = APIRouter()

@router.post("/chat")
async def chat(request: ChatRequest):
    res = await get_chat_response(
        message=request.message,
        session_id=request.session_id
    )
    return {"response": res}



