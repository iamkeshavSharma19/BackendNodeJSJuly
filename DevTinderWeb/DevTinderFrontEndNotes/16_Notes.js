//?What is this cors error ==> Suppose If you are trying to make an api call from "X" domain to "Y" domain,then basically It gives you a cors Error.This is basically a cross Origin Error.It says you cannot make an api call from different origin to different origin.

//*What do you mean by origin ??See basically I am trying to make an api call from http://localhost:5173/login to http://localhost:7777/login,these 2 are different origins and different ports all together.

//*Suppose If your api's are on the same domain,suppose If you are making an api call from "amazon.com" to "amazon.com", it's okay.It will not throw the cors Error.Who will not throw the cors Error? This cors Error is at the Browser's level.POSTMAN is not bothered about the cors error that api calling works perfectly there,but my browser is bothered about the cors error.Browsers for the security reasons,browsers donot allow the cross origin requests.So you cannot make an api call from another domain to another domain.Now I can handle this cors error from the api level.Go to "/login" api in the backend repository.

//^we will be using a cors npm package,we use this package as a middleware.npm i cors ==> run this command inside the backend repo.Go to app.js file

//?Why cookies did'not set even after logging in ?? ==> The answer lies basically in the unsecure networks.If you are not on the same domain,If you are not using https,the browser does'not allow cookies to be set in your browser.Your cookies will never be set like this.For solving this issue we basically have to whitelist our domain names.Inside the cors plugin/middleware you can basically send some options as well as configurations over here.

//?But still I have not got any token in my browser's cookies?the reason is whenever you are making an axios call,you basically also have to pass in one more configuration which is called withCredentials: true.Now the token will be set successfully in the browser's cookies section
