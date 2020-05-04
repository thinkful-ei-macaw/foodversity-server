### foodversity serverside

https://infinite-mountain-24508.herokuapp.com

## Live App: https://foodversity-client.now.sh/

## Tech Stack:

- React
- HTML
- CSS
- Node.js
- Express
- PostgreSQL
- knex
- bcrypt
- Chai /Mocha

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

"password": "$2a$12\$MSuiRX9K9KA9/bOpqJb5KuiGB5z/oZj6ttmfy/dev15mHNve/jWj6",

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

### What is this app all about??

App flow: https://docs.google.com/drawings/d/1whdfrOJibZVpIOiluUBYOeNEtFzqpsBkfLRUf-vnieQ/edit?usp=sharing

MVP:
User stories by priority:

1. Have to view start screen
2. Have to view info page
3. Have to view main page
4. Have to be able to add items
5. Have to be able to delete items

Secondary priority/optional:

Expanded view
Edit existing entry
filter by ingredient
user signup section

Users (who are they):

- people who don't want to eat the same thing every day
- Planners who like taking the mystery out of meal planning and have everything set up for the week
- People who like variety and diversity in their meals

What this app does:

- You can add your favourite meals to the journal for every day of the week
- Add ingredients you want to use, like chicken or pasta, and methods of preparation, so you can track what you ate and
  not eat the same thing every day
- Create meals for breakfast, lunch, dinner, and snacks
- Edit the already added meals and change things around
- Able to compile a week long meal plan, making sure you don't run out of ingredients

### How To Use Foodversity

- On start up screen, click Info to learn more about the app
- Click on 'Get Started' to be taken to the log in page
- Log in with demo credentials: user: demo pw: D3m0!1234
- Arrive on main page!
- Click on Add Day of the week to add a new day to appear in the calendar
- Click on Add Food to open the food form.
  - from here: select day from the drop down menu to choose what day you're adding to
  - enter meal type(breakfast, snack, etc.)
  - enter at least one food item to add (all other fields are optional)
  - click on Add Meal to add your selections to the calendar!
- You can click Nevermind at any time to go back to the previous page
- DELETE removes the entire day with all entries (at the moment). Future updates will include an option to EDIT and delete individual items ;)

- Log out of account takes the user back to the start screen

New Users:

- create meals journals
- immediately start adding meals
- delete what they have just added, and start over

existing users:

- view existing meal journal with their entries
- Edit what they have previously entered
- Add new meals for all the days of the week
