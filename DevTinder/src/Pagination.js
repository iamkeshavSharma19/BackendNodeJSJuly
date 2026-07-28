//&Suppose We have the /feed API,In the feed api,generally you would have seen a very good standard Practice is to use query params.In the query params I can basically say /feed?page=1&limit=10.That means I basically want my first 10 Users.

//?feed?page=1&limit=10 => first 10 Users. users from 1-10

//?feed?page=2&limit=10 => Here I will get the users from 11-20.

//?feed?page=3&limit=10 => Here I will get the users from 21-30.

//*In MongoDB Basically you have 2 functions,which are very important functions,Those functions are known as skip() and limit().

//* limit() means how many documents do you want?

//* skip() => means how many documents do you skip from the first??Skip from the starting.

//^We just have to pass the right parameters into these functions and It will give me good results.

//^.skip(0) & .limit(10) ==> It will give me first 10 users.It is skipping 0 users and It is saying me limit 10 users.

//? /feed?page=1&limit=10 => 1 - 10 => .skip(0) & .limit(10)

//?Suppose If you want the page no.2,So you will have to basically skip the first 10 users and then limit(10) means the next 10 users

//? /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

//?Suppose If you want Page no.3, so you will basically skip the first 20 Users and then .limit(10).So it will give me 21-30 users.

//? /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10).

//!Meet you at the user.js file inside the routes folder.
