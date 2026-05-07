import sqlite3

def init_db():
    conn = sqlite3.connect("database.db", check_same_thread=False)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY,
        session_id INTEGER,   
        role TEXT,
        content TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def save_message(session_id: int, role: str, content: str):
    conn = sqlite3.connect("database.db", check_same_thread=False)
    cursor = conn.cursor()

    cursor.execute("INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)", (session_id, role, content))

    conn.commit()
    conn.close()

def get_messages(session_id: int, limit: int = 10):
    conn = sqlite3.connect("database.db", check_same_thread=False)
    cursor = conn.cursor()

    cursor.execute("SELECT role, content FROM messages WHERE session_id = ? ORDER BY id DESC LIMIT ?", (session_id, limit))
    data = cursor.fetchall()

    conn.close( )
    data.reverse()
    return [
        {"role": role, "content": content} for role, content in data
    ]

def create_session():
    conn = sqlite3.connect("database.db", check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO sessions DEFAULT VALUES")

    last_row_id = cursor.lastrowid

    conn.commit()
    conn.close()

    return last_row_id

def get_sessions():
    conn = sqlite3.connect("database.db", check_same_thread=False)
    cursor = conn.cursor()

    cursor.execute("SELECT id, created_at FROM sessions ORDER BY id DESC")

    data = cursor.fetchall()
    conn.close()
    return [
        {"id": id, "created_at": created_at} for id, created_at in data
    ]

