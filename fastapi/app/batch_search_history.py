import json
import random
import string
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.buyer import Base as BuyerBase, SearchHistory  # SearchHistoryモデルをインポート

DB_URL = "mysql+pymysql://root@db:3306/mercari?charset=utf8"
engine = create_engine(DB_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def load_predefined_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def create_predefined_data(session, data):
    for item in data:
        # 重複チェック
        existing_entry = session.query(SearchHistory).filter_by(query=item["query"]).first()
        if existing_entry:
            # 重複があった場合はカウントを更新
            existing_entry.count += item["count"]
            print(f"Updated count for '{item['query']}' to {existing_entry.count}.")
        else:
            # 重複がなかった場合は新規挿入
            search_history = SearchHistory(query=item["query"], count=item["count"])
            session.add(search_history)
            print(f"Inserted '{item['query']}' with count {item['count']}.")
    session.commit()

def populate_database(data):
    session = SessionLocal()
    try:
        create_predefined_data(session, data)
        print("Predefined data insertion successful.")
    finally:
        session.close()

if __name__ == "__main__":
    predefined_data = load_predefined_data('batch_search_history.json')
    populate_database(predefined_data)