import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlmodel import SQLModel, Session
from dotenv import load_dotenv
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.main import app
from api.deps.db_session_dep import get_session

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

engine = create_engine(
  DATABASE_URL,
  poolclass=StaticPool,
)

@pytest.fixture(name='session')
def session_fixture():
  SQLModel.metadata.create_all(engine)
  with Session(engine) as session:
    yield session
  SQLModel.metadata.drop_all(engine)

@pytest.fixture(name='client')
def client_fixture(session: Session):
  def get_session_override():
    return session
  app.dependency_overrides[get_session] = get_session_override

  client = TestClient(app)
  yield client
  app.dependency_overrides.clear()