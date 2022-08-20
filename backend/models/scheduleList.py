from datetime import datetime

from db.database import Base
from sqlalchemy import Column, DateTime, Integer, String


class ScheduleList(Base):
    __tablename__ = 'scheduleList'
    id = Column(Integer, primary_key=True, autoincrement=True)
    schedule_list_name = Column(String(40), nullable=False)
    schedule = Column(String(), nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):

        initial = {
            "id": str(self.id),
            "schedule": self.schedule,
            "schedule_list_name": self.schedule_list_name,
            "date_created": str(datetime.timestamp(self.date_created)),
        }

        return str(initial)
