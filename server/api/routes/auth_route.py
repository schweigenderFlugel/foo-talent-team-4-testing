from fastapi import APIRouter, Depends
from config.db_config import SessionDep
from services import auth_service

from models.auth_models import User, RegisterUser, Login
from schemas.jwt_response import TokenResponse

router = APIRouter(
  tags=["Auth"],
  prefix="/auth",
)

@router.post("/register")
def register(user: RegisterUser, session: SessionDep):
    return auth_service.register(user, session)

@router.post("/login", response_model=TokenResponse)
def login(user: Login, session: SessionDep):
  return auth_service.login(user, session)

@router.get("/me")
def read_current_user(current_user: User):
  return {
    "email": current_user.email,
    "id": current_user.id,
  }
