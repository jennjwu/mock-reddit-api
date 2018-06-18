## Get Favorites

Fetches favorite reddits for a user

**URL**: /favorites

**Method**: GET

**Auth required**: yes (Requires valid `access-key` header)

**Permission required**: no

## Success response

**Code**: 200 OK

**Example**

```
[
    {
        "id": "8rtngq",
        "permalink": "/r/nonononoyes/comments/8rtngq/kid_tries_to_outrun_a_cheetah/",
        "url": "https://gfycat.com/HiddenHatefulAddax",
        "author": "monkeyeatingeagle",
        "tag": "this is awesome"
    },
    {
        "id": "8rtka6",
        "permalink": "/r/HistoryMemes/comments/8rtka6/fuckin_serbs/",
        "url": "https://i.redd.it/nmqvg76o9m411.jpg",
        "author": "jamie_mellon21"
    }
]
```

## Fail response

**Code**: 401 Unauthorized

**Example**

```
{
    "error": "invalid access key"
}
```
