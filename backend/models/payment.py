from db.database import Base
from sqlalchemy import Column, Integer, String


class Payment(Base):
    __tablename__ = 'payment'
    id = Column(Integer, primary_key=True, autoincrement=True)
    payment_date = Column(String(), nullable=False)
    payment_amount = Column(Integer(), nullable=False)
    type = Column(String(30), nullable=False)
    payer_id = Column(String(), nullable=False)
    method = Column(String(5), nullable=False)
    teacher_id = Column(String())
    group_id = Column(String())

    def __repr__(self):

        initial = {
            "id": self.id,
            "payment_date": self.payment_date,
            "payment_amount": self.payment_amount,
            "type": self.type,
            "payer_id": self.payer_id,
            "method": self.method,
            "teacher_id": self.teacher_id,
            "group_id": self.group_id,
        }

        return str(initial)
