from fastapi import FastAPI
import uvicorn
from dotenv import load_dotenv
import os

app = FastAPI()

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