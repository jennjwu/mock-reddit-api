## Login

Logs in a user

**URL**: /users/login

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

A new access key is generated for existing user.

**Code**: 200 OK

**Example**

```
{
    "accessKey": "6t2z81341344w0000000000"
}
```

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

**Code**: 404 Not Found

**Example**

```
{
    "error": "no such user found"
}
```

_Note: bad password will fall in here too_