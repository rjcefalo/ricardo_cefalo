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


```
Status 200:
Returns Mail collection
{
  mails:[
    {
      "destination": "STRING",
      "body": "STRING"
    },
    ...,
  ]
}

```
```
POST

Content-Type: 'application/json'
Request: 
{
  "destination": "STRING",
  "body": "STRING"
}

Required: Yes

Max Payload: 120.000 characters

```

```
DELETE

Deletes every mail created from the database
```

```
Status 200:

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

```
Status 200:

OK
```