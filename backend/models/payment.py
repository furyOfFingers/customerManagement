from datetime import datetime

from db.database import Base
from sqlalchemy import Column, Integer, DateTime, String


class Payment(Base):
    __tablename__ = 'payment'
    id = Column(Integer, primary_key=True, autoincrement=True)
    date_created = Column(DateTime, default=datetime.utcnow)
    payment_amount = Column(String(10), nullable=False)
    type = Column(String(), nullable=False)
    payerId = Column(String(), nullable=False)
    method = Column(String(5), nullable=False)
    teacher_id = Column(String())
    group_id = Column(String())

    def __repr__(self):

        initial = {
            "id": self.id,
            "date_created": self.date_created,
            "payment_amount": self.payment_amount,
            "type": self.type,
            "payerId": self.payerId,
            "method": self.method,
            "teacher_id": self.teacher_id,
            "group_id": self.group_id,
        }

        return str(initial)
