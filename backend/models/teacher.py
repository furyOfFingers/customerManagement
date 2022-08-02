from datetime import datetime

from db.database import Base
from sqlalchemy import Column, DateTime, Integer, String


class Teacher(Base):
    __tablename__ = 'teacher'
    id = Column(Integer, primary_key=True, autoincrement=True)
    lastname = Column(String(80), nullable=False)
    firstname = Column(String(80), nullable=False)
    patronymic = Column(String(80), nullable=False)
    phone = Column(String(30), nullable=False)
    birthday = Column(String(10), nullable=False)
    photo = Column(String())
    gender = Column(String(10), nullable=False)
    students = Column(String())
    date_created = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        students_arr = self.students.split(',')

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

        if self.students:
            initial['students'] = students_arr
        if self.photo:
            initial['photo'] = self.photo

        return str(initial)
