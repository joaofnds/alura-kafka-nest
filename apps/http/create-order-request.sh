#!/usr/bin/env sh

curl --location --request POST 'localhost:3000/' \
--header 'Content-Type: application/json' \
--data-raw '{
	"id": "12345",
	"email": "joaofnds@joaofnds.com",
	"amount": "100.00"
}'
