from fastapi import HTTPException, status
from sqlmodel import select

from deps.db_session_dep import SessionDep
from config.envs import SECRET_KEY, ALGORITHM
from models.auth_model import User, RegisterUser, Login
from utils.jwt_utils import get_password_hash, create_access_token, verify_password

def register(db: SessionDep, body: RegisterUser):
    existing_user = db.exec(select(User).where(User.email == body.email)).first()

    if existing_user:
        raise HTTPException(status_code=409, detail="Email already registered!")

    hashed = get_password_hash(body.password)
    user = User(email=body.email, password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User successfully created!"}

def login(db: SessionDep, body: Login):
    user_found: User = db.exec(select(User).where(User.email == body.email)).first()
    if not user_found or not verify_password(body.password, user_found.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_id = str(user_found.id)
    access_token = create_access_token(data={"sub": user_id, "role": user_found.role})
    return {"access_token": access_token, "token_type": "bearer"}