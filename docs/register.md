## Register User

Register a user with username and password

**URL**: /users

**Method**: POST

**Body**: 
```
{
    "username": "<user>",
    "password": "<password>"
}
```

**Auth required**: no

**Permission required**: no

## Success response

**Code**: 200 OK

**Example**

```
{
    "accessKey": "6t2z81341344w0000000000"
}
```

_Note: duplicate username check is not currently implemented. Server will allow it through._

## Fail response

**Code**: 422 Unprocessable Entity

**Examples**

```
{
    "error": "required username and password fields not provided"
}
```

```
{
    "error": "body cannot be parsed to JSON"
}
```

