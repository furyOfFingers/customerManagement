from db.database import Base
from sqlalchemy import Column, Integer, String


class Group(Base):
    __tablename__ = 'group'
    id = Column(Integer, primary_key=True, autoincrement=True)
    group_name = Column(String(40), nullable=False)
    teacher = Column(String(4), nullable=False)
    students = Column(String(), nullable=False)
    class_date = Column(String(), nullable=False)

    def __repr__(self):
        students_arr = self.students.split(',')

        initial = {
            "id": str(self.id),
            "group_name": self.group_name,
            "teacher": self.teacher,
            "students": students_arr,
            "class_date": self.class_date,
        }

        return str(initial)
