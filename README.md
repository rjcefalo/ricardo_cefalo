# MessageApp
***

Send all request to: 
```
http://localhost:9001
```
*Methods:*
Path: /message

```
GET
```
*Response*

Status 200:
```
This is my first, 'Hello World'
```
```
POST
Path: /message

Content-Type: 'application/json'
Request: 
{
  "destination": "STRING",
  "body": "STRING"
}

Required: Yes

Max length:
  "destination" = 50 characters
  "body" = 100 characters

Simple Example: 

{
  "destination": "user",
  "body": "user"
}
```

```
DELETE

Deletes every mail created from the database
```

*Response:*

Status 200:
```
OK
```

Path: /credit
```
POST
Add credit to send messages
```
Content-Type: 'application/json'
Request: 
{
  "credit": Number
}

*Response:*

Status 200:
```
OK
```