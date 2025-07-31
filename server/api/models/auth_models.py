from typing import Optional
from uuid import UUID as uuid
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, VARCHAR, TIMESTAMP
from sqlmodel import SQLModel, Field
import uuid as py_uuid

class UserBase(SQLModel):
  email: str = Field(sa_column=Column(VARCHAR), description='User email')
  password: str = Field(sa_column=Column(VARCHAR), description='User email')

class IdModel(SQLModel):
  id: Optional[uuid] = Field(default_factory=py_uuid.uuid4, primary_key=True)

class Timestamp(SQLModel):
  created_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
  updated_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))

class User(Timestamp, UserBase, IdModel, table=True):
  __tablename__ = 'users'

class RegisterUser(UserBase):
  pass

class Login(UserBase):
  pass