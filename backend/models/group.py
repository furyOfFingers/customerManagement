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
        class_date_arr = self.class_date.split(',')

        initial = {
            "id": str(self.id),
            "group_name": self.group_name,
            "teacher": self.teacher,
            "students": students_arr,
            "class_date": class_date_arr,
        }

        return str(initial)
