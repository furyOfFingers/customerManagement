from sqlalchemy import Column, Integer, String, DateTime, Boolean, BLOB
from datetime import datetime
from db.database import Base


class Student(Base):
    __tablename__ = 'student'
    id = Column(Integer, primary_key=True, autoincrement=True)
    lastname = Column(String(100), nullable=False)
    firstname = Column(String(100), nullable=False)
    patronymic = Column(String(100), nullable=False)

    phone = Column(String(30), nullable=False)
    birth_day = Column(String(10), nullable=False)
    photo = Column(String(), nullable=False)
    gender = Column(String(10), nullable=False)
    # groups = Column(String(10), nullable=False)
    # parents = Column(String(10), nullable=False)
    # payment = Column(String(10), nullable=False)
    # is_phone_number_client = Column(Boolean(10), nullable=False, default=False)
    date_created = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return str(
            {
                "id": str(self.id),
                "lastname": self.lastname,
                "firstname": self.firstname,
                "patronymic": self.patronymic,
                "phone": self.phone,
                "birth_day": self.birth_day,
                "photo": self.photo,
                "gender": self.gender,
                # "groups": self.groups,
                # "parents": self.parents,
                # "payment": self.payment,
                # "is_phone_number_client": self.is_phone_number_client,
                "date_created": str(datetime.timestamp(self.date_created)),
            }
        )