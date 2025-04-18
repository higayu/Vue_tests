#!/bin/bash

# SSLディレクトリの作成
mkdir -p ssl

# CA証明書の生成
openssl genrsa 2048 > ssl/ca-key.pem
openssl req -new -x509 -nodes -days 3650 -key ssl/ca-key.pem -out ssl/ca-cert.pem -subj "/CN=MySQL_CA"

# サーバー証明書の生成
openssl req -newkey rsa:2048 -days 3650 -nodes -keyout ssl/server-key.pem -out ssl/server-req.pem -subj "/CN=MySQL_Server"
openssl rsa -in ssl/server-key.pem -out ssl/server-key.pem
openssl x509 -req -in ssl/server-req.pem -days 3650 -CA ssl/ca-cert.pem -CAkey ssl/ca-key.pem -set_serial 01 -out ssl/server-cert.pem

# クライアント証明書の生成
openssl req -newkey rsa:2048 -days 3650 -nodes -keyout ssl/client-key.pem -out ssl/client-req.pem -subj "/CN=MySQL_Client"
openssl rsa -in ssl/client-key.pem -out ssl/client-key.pem
openssl x509 -req -in ssl/client-req.pem -days 3650 -CA ssl/ca-cert.pem -CAkey ssl/ca-key.pem -set_serial 01 -out ssl/client-cert.pem

# 権限の設定
chmod 600 ssl/*.pem