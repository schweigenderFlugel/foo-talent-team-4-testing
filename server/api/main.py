from fastapi import FastAPI
from dotenv import load_dotenv
import uvicorn
import os

from config.db_config import create_db_and_tables
from routes import auth_route

load_dotenv()

app = FastAPI(lifespan=create_db_and_tables)

app.include_router(auth_route.router)

@app.get("/")
def root():
  return {"message": "API is running 🚀"}

if __name__ == "__main__":
  environment = os.getenv("ENVIRONMENT")
  uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=3000,
    reload=(environment == "development"),
    use_colors=True
  )