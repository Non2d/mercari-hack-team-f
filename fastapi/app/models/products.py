from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DECIMAL,
    Enum,
    DateTime,
    ForeignKey,
    func,
    Index
)
from sqlalchemy.orm import relationship
from db import Base
import enum

# Published or in the BOX
class ProductStatus(enum.Enum):
    DRAFT = 'draft'
    PUBLISHED = 'published'

# Products Model
class Product(Base):
    __tablename__ = 'products'

    ProductID = Column(Integer, primary_key=True, autoincrement=True)
    # UserID = Column(String(255), ForeignKey('users.uid'), nullable=False)
    UserID = Column(String(255), nullable=False)
    Title = Column(String(255), nullable=False)
    Description = Column(Text)
    Price = Column(DECIMAL(10, 2))
    Status = Column(Enum(ProductStatus), nullable=False, default=ProductStatus.DRAFT)
    ImageURL = Column(String(255), nullable=False)
    demand = Column(Integer, nullable=False)

    # user = relationship('User', back_populates='products')

    def __repr__(self):
        return f"<Product(ProductID={self.ProductID}, Title='{self.Title}', Status='{self.Status.name}')>"

# Index UserID and Status
Index('idx_user_status', Product.UserID, Product.Status)
