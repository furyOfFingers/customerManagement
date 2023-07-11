from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from db.database import Base


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False)
    password = Column(String(120), nullable=False)
    email = Column(String(120), unique=True)
    gender = Column(String(6), nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return str(
            {
                "id": str(self.id),
                "email": self.email,
                "gender": self.gender,
                "password": self.password,
                "username": self.username,
                "date_created": str(datetime.timestamp(self.date_created)),
            }
        )
