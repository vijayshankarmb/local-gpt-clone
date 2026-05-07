from fastapi import APIRouter
from core.database import create_session, get_sessions, get_messages

router = APIRouter()

@router.post("/session/create")
def create_new_session():
    session_id = create_session()
    return {"session_id": session_id}

@router.get("/sessions")
def get_all_sessions():
    sessions = get_sessions()
    return sessions

@router.get("/history/{session_id}")
def get_history(session_id: int):
    history = get_messages(session_id, 20)
    return history

