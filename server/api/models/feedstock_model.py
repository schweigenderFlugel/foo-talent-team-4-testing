from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field
from sqlalchemy import Column, VARCHAR, TEXT, FLOAT, BOOLEAN, TIMESTAMP
from sqlalchemy.dialects.postgresql import ENUM
from enum import Enum
from uuid import UUID as uuid, uuid4
from datetime import datetime, timezone
from pydantic import create_model

class MeasureUnit(str, Enum):
    KILOGRAMMS = 'KILOGRAMMS'
    UNIT = 'UNIT'
    HOURS = 'HOURS'
    OTHERS = 'OTHERS'

class FeedstockBase(SQLModel):
    name: str = Field(sa_column=Column(VARCHAR), description='Name of the feedstock')
    description: str = Field(sa_column=Column(TEXT), description='Description of the feedstock')
    measure_unit: MeasureUnit = Field(sa_column=Column(ENUM(MeasureUnit)), description='Unit measure for feedstock')
    unit_cost: float = Field(sa_column=Column(FLOAT), description='The cost per unit')
    provider: Optional[str] = Field(sa_column=Column(VARCHAR), description='The provider of the feedstock')

class Timestamp(SQLModel):
    created_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(sa_column=Column(TIMESTAMP), default_factory=lambda: datetime.now(timezone.utc))

class Feedstock(Timestamp, FeedstockBase, table=True):
    __tablename__ = 'feedstocks'
    id: Optional[uuid] = Field(default_factory=uuid4, primary_key=True)
    is_deleted: Optional[bool] = Field(sa_column=Column(BOOLEAN), default=False)

class CreateFeedstock(FeedstockBase):
    pass

optional_fields = {field: (Optional[typ], None) for field, typ in FeedstockBase.__annotations__.items()}

UpdateFeedstock = create_model(
    "UpdateFeedstock",
    __base__=FeedstockBase,
    **optional_fields
)
