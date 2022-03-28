from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from db.database import Base


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False)
    password = Column(String(120), nullable=False)
    email = Column(String(120), unique=True)
    gender = Column(String(10), nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow)

    # def __init__(self, username=None, email=None, password=None, gender=None, date_created=None):
    #     self.username = username
    #     self.email = email
    #     self.password = password
    #     self.gender = gender
    #     self.date_created = date_created

    def __repr__(self):
        return f'<User {self.username} / {self.email} / {self.gender} / {self.date_created}>'
        # return '{"username": {self.username}, "email": {self.email}, "gender": {self.gender}, "date_created": {self.date_created}}'
