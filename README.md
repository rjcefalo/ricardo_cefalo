# MessageApp
***

Send all request to: 
```
http://localhost:9001
```
*Methods:*

```
GET
Path: /message
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

*ERRORS:* 

Status 400:
```
You can't provide an empty field
Numbers are not allowed
Destination or Body fields missing
Destination name or message text had exceed the length limit
```
Status 500:
```
Internal Server error
```