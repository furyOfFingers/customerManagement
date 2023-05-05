from db.database import Base
from sqlalchemy import Column, String


class VisitList(Base):
    __tablename__ = 'visit_list'
    id = Column(String, primary_key=True)
    days = Column(String, nullable=False)

    def __repr__(self):
        return str({
            'id': self.id,
            'days': self.days,
        })
