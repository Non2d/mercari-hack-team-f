「断捨離BOX」Mercari AI/LLM Hackathon Product by Team F

コンセプト
- メルカリの「価値を循環させる」力を活かして、不要になったモノの処分を躊躇ったり、面倒くさがっているヒトの断捨離をお手伝いするプロダクト
- 検索数に基づき需要を提示することで、売れそうなものを手放したくさせる。また、売れなさそうなものでも定期的に断捨離を促すメッセージを受け取り意識を高められる
- 現在、本の断捨離に特化した機能が実装されている

事前準備
- fastapi/app/.envを作成、OPENAI_API_KEYを設定
- dockerを起動
- ルートディレクトリでdocker compose upを実行
- 任意のディレクトリでdocker exec mercari-fastapi python batch_search_history.pyを実行
  - 検索数のダミーデータが入力されます

アプリの使い方
![image](https://github.com/user-attachments/assets/376cfe09-372e-49ce-8761-7c3a9c6cdbc5)
- 断捨離ページトップ
- 「画像をアップロードする」ボタンから、断捨離したい本の画像（複数の本が写っていてもOK）を選択し、アップします
  - まずはdanshari-items/books.jpgを試すことをお勧めします。検索数データベースとの連携が体験できるためです
- 注意：このリポジトリではセキュリティの都合上、Googleログイン機能はオフにし、つねにguest_userとして登録・ログインされる仕様になっております
  - ハッカソンの時にはGoogleログインが動作しており、実際のGoogleアカウントに紐づいたuidをもとに画像やデータが登録されていました

![image](https://github.com/user-attachments/assets/5f635394-8517-4d5e-86ee-94ae611caccf)
