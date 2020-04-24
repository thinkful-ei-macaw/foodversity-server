### foodversity serverside

https://infinite-mountain-24508.herokuapp.com

## API documentation

# POST Registration /users/

{
"id": 2,
"user_name": "bond",
"full_name": "jamesbond",
"password": "$2a$12\$Iw1kMOHKOKNPGQEvA/5nve1Pp0yiZKw58WmU0OYP.l.stBZpDcreK",
"nickname": null,
"date_created": "2020-04-24T05:24:15.512Z",
"date_modified": null
}

# POST API/ auth / login

retreive a bearer Token
HTTP ok: ::1 - - [24/Apr/2020:04:37:09 +0000] "OPTIONS /api/auth/login HTTP/1.1" 204 0

login username/password sample:
{
"user_name": "user",
"password": "password!1234"
}

"authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1ODc3MDE5NTksInN1YiI6ImRlbW8ifQ.tU3BBXIGaIX1FVNWsYmLv3NOeVesHO7s5zI7BiOqS1Q"

# GET /users

all users example (array):
[
{
"id": 1,
"user_name": "demo",
"full_name": "Demo User",
"password": "$2a$12$MSuiRX9K9KA9/bOpqJb5KuiGB5z/oZj6ttmfy/dev15mHNve/jWj6",
"nickname": null,
"date_created": "2020-04-24T01:32:36.537Z",
"date_modified": null
}
]

# POST /food

"POST /food HTTP/1.1" 200 123

constructs user_id for the logged in user
{
"id": 25,
"content": "yum",
"days_id": 7,
"meal_type": "lunch",
"second_item": "item4",
"third_item": "item6",
"url": "https://www.thinkful.com",
"user_id": 1
}

# GET /food and /days

GET /days HTTP/1.1" 200 215
GET /food HTTP/1.1" 200 683

food example array
[
{
"id": 7,
"content": "breakfast: eggs",
"meal_type": "",
"second_item": "",
"third_item": "",
"url": "",
"days_id": 6
},
{
"id": 8,
"content": "dinner: pizza",
"meal_type": "dinner",
"second_item": "",
"third_item": "",
"url": "",
"days_id": 7
}
]

days array:
[
{
"id": 6,
"title": "2020-04-23"
},
{
"id": 7,
"title": "2020-04-24"
},
{
"id": 9,
"title": "2020-04-25"
},
{
"id": 11,
"title": "2020-04-27"
},
{
"id": 12,
"title": "2020-04-28"
},
{
"id": 13,
"title": "2020-04-29"
}
]
