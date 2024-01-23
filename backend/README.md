# Backend

Spring-Boot で作る API

# Versions

- Apache Maven 3.9.6
- java version "17.0.9" 2023-10-17 LTS

# 実行手順

- ルートディレクトリで`docker-compose up -d`を実行し、Docker コンテナを起動する
- backend 配下で`mvn clean install`を実行し、依存関係の解決をする
- その後、`mvn spring-boot:run`を実行すると、アプリケーションが立ち上がる

# Mybatis-generator

- backend 配下で`mvn mybatis-generator:generate`を実行する
- テーブルを追加した際は、resources 配下にある generatorConfig.xml を修正する

# DB

- postgresDB にアクセスする方法：`docker exec -it kintarou-kai-postgres-1 psql -h localhost -U postgres -d kintarou`
