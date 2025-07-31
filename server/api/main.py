from fastapi import FastAPI
from dotenv import load_dotenv
import uvicorn
import os

from config.db_config import get_session

load_dotenv()

app = FastAPI(lifespan=get_session)

@app.get('/')
def hello():
  return { "message": "Hello world!" }

if __name__ == "__main__":
  environment = os.getenv("ENVIRONMENT")
  uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=3000,
    reload=(environment == "development"),
    use_colors=True
  )