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

    # def __init__(self, username=None, email=None, password=None, gender=None, date_created=None):
    #     self.username = username
    #     self.email = email
    #     self.password = password
    #     self.gender = gender
    #     self.date_created = date_created

    def __repr__(self):
        # return f'<{self.username} / {self.email} / {self.gender} / {self.date_created} / {self.password}>'
        # date = {
        #     "year": self.date_created.year,
        #     "month": self.date_created.month,
        #     "day": self.date_created.day,
        #     "hour": self.date_created.hour,
        #     "minute": self.date_created.minute,
        #     "second": self.date_created.second,
        #     "timestamp": datetime.timestamp(self.date_created)
        # }

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
