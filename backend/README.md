# Backend
Spring-Bootで作るAPI

# Versions
- Apache Maven 3.9.6
- java version "17.0.9" 2023-10-17 LTS

# 実行手順
- ルートディレクトリで`docker-compose up -d`を実行し、Dockerコンテナを起動する
- backend配下で`mvn clean install`を実行し、依存関係の解決をする
- その後、`mvn spring-boot:run`を実行すると、アプリケーションが立ち上がる

# Mybatis-generator
- backend配下で`mvn mybatis-generator:generate`を実行する
- テーブルを追加した際は、resources配下にある generatorConfig.xmlを修正する