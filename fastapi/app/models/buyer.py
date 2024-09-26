from sqlalchemy import Column, Integer, String
from db import Base

class SearchHistory(Base):
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    query = Column(String(255), unique=True, index=True)
    count = Column(Integer)
    def __repr__(self):
        return f"<UserSearchHistory(SearchID={self.SearchID}, UserID={self.UserID}, Query='{self.Query}', SearchTime='{self.SearchTime}')>"
