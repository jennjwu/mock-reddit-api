## Save Favorite

Saves a favorite reddit for a user

**URL**: /favorites

**Method**: POST

**Body**: 
```
{
    "redditId": "8rtngq",
    "tag": "great stuff"
}
```

Note: `tag` field in body is optional.

**Auth required**: yes (Requires valid `access-key` header)

**Permission required**: no

## Success response

**Code**: 200 OK

**Example**

```
{
    "message": "favorite added successfully"
}
```

_Note: duplicate check is not implemented._

## Fail response

**Code**: 401 Unauthorized

**Example**

```
{
    "error": "invalid access key"
}
```
