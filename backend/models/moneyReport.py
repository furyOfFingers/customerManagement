from db.database import Base
from sqlalchemy import Column, Integer, String


class MoneyReport(Base):
    __tablename__ = 'moneyReport'
    id = Column(Integer, primary_key=True, autoincrement=True)
    value = Column(String(50), nullable=False)
    label = Column(String(50), nullable=False)
    hint = Column(String(100), nullable=False)
    teacher_salary = Column(String(10), nullable=False)
    subscription_payment = Column(String(10), nullable=False)

    def __repr__(self):
        return str({
            "id": self.id,
            "value": self.value,
            "label": self.label,
            "hint": self.hint,
            "teacher_salary": self.teacher_salary,
            "subscription_payment": self.subscription_payment,
        })
