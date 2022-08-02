from datetime import datetime

from db.database import Base
from sqlalchemy import Column, DateTime, Integer, String


class Student(Base):
    __tablename__ = 'student'
    id = Column(Integer, primary_key=True, autoincrement=True)
    lastname = Column(String(80), nullable=False)
    firstname = Column(String(80), nullable=False)
    patronymic = Column(String(80), nullable=False)

    phone = Column(String(30), nullable=False)
    birthday = Column(String(10), nullable=False)
    photo = Column(String())
    gender = Column(String(10), nullable=False)
    teachers = Column(String())
    date_created = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        teachers_arr = self.teachers.split(',')

        initial = {
            "id": str(self.id),
            "lastname": self.lastname,
            "firstname": self.firstname,
            "patronymic": self.patronymic,
            "phone": self.phone,
            "birthday": self.birthday,
            "gender": self.gender,
            "date_created": str(datetime.timestamp(self.date_created)),
        }

        if self.teachers:
            initial['teachers'] = teachers_arr
        if self.photo:
            initial['photo'] = self.photo

        return str(initial)
