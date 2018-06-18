## Reddit results

See recent results from reddit

**URL**: /reddit

**Method**: GET

**Auth required**: yes (Requires valid `access-key` header)

**Permission required**: no

## Success response

**Code**: 200 OK

**Example**

```
[
    {
        "id": "8rvd0w",
        "permalink": "/r/wholesomememes/comments/8rvd0w/the_real_bill_gates/",
        "url": "https://i.imgur.com/75SqS4w.png",
        "author": "AristocratesSR"
    },
    {
        "id": "8rupkn",
        "permalink": "/r/pics/comments/8rupkn/egyptian_fan_lifted_by_mexican_and_colombian_fans/",
        "url": "https://i.imgur.com/djp2XLL.jpg",
        "author": "Johnny6_Blaze9"
    },
    {
        "id": "8ruzmz",
        "permalink": "/r/outrun/comments/8ruzmz/lets_all_take_a_moment_to_appreciate_blank_vhs/",
        "url": "https://i.redd.it/wtf8xpqbcn411.jpg",
        "author": "GalacticLinx"
    }
]
```

## Fail response

**Code**: 401 Forbidden

**Example**

```
{
    "error": "invalid access key"
}
```

**Code**: 500 Internal Server Error

**Example**

```
{
    "error": "some server issue"
}
```

