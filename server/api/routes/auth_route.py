from fastapi import APIRouter, Body
from fastapi import Response

from deps.db_session_dep import SessionDep
from services import auth_service

from models.auth_model import RegisterUser, Login

from schemas.jwt_response import TokenResponse

router = APIRouter(
  tags=["Auth"],
  prefix="/auth",
)

@router.post("/register", 
  status_code=201,
  tags=['Auth'], 
  summary='Register a new user',
  responses={
    201: Response(
      description='User successfully registered',
      content_type='application/json',
      message='User successfully registered!',
    ).custom_response(),
    409: Response(
      description='User already exists', 
      content_type='application/json',
      message="User already exists"
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },
)
def register(session: SessionDep, body: RegisterUser):
  return auth_service.register(db=session, body=body)

@router.post("/login",
  status_code=200,
  tags=['Auth'], 
  summary='Login',
  response_model=TokenResponse,
  responses={
    401: Response(
      description='Invalid creadentials', 
      content_type='application/json',
      message='CRedentials are invalid',
    ).custom_response(),
    500: Response(
      description='Unexpected error has ocurred', 
      content_type='application/json',
      message="Unexpected internal server error"
    ).custom_response(),
  },
)
def login(session: SessionDep, body: Login = Body()):
  return auth_service.login(db=session, body=body)

