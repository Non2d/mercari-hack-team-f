# from sqlalchemy import (
#     Column,
#     Integer,
#     String,
#     Text,
#     DECIMAL,
#     Enum,
#     DateTime,
#     ForeignKey,
#     func,
#     Index
# )
# from sqlalchemy.orm import relationship
# from db import Base
#
# # User Model
# class User(Base):
#     __tablename__ = 'users'
#
#     UserID = Column(Integer, primary_key=True, autoincrement=True)
#     Username = Column(String(50), nullable=False)
#     Email = Column(String(100), nullable=False, unique=True)
#     Password = Column(String(255), nullable=False)
#     CreatedAt = Column(DateTime(timezone=True), server_default=func.now())
#
#     products = relationship('Product', back_populates='user')
#
#     def __repr__(self):
#         return f"<User(UserID={self.UserID}, Username='{self.Username}', Email='{self.Email}')>"
