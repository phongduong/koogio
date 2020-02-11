# Admin CMS

[Admin CMS](https://koogio-admin-cms.herokuapp.com/) include 2 parts: web app and API server. 

For web app, I used server side rendering with NestJS and Pug. I used some additional tools like Bootstraps for ui, SCSS for style and Gulp for task runner.

Because I wanted to use Typescript for client Javascript and SCSS for style, I had to use Gulp to compile them. But I ran Nestjs command to watch every change I made to files, so I needed to run Gulp command concurrently. 

I used Firebase Authentication with Google Sign in to sign into the app. For every render page, I used fetch to commute with API. Every API needed an authentication token to process request, so I used id token I obtained from Google Sign in as an authentication token. 

In backend API, I used Firebase Admin to work with Firebase services like Firebase Storage and Firestore database as well as decrypt the authentication token from client.

These are tools I used
* [Firestore](https://firebase.google.com/docs/firestore/)
* [Firebase Storage](https://firebase.google.com/docs/storage/)
* [Firebase Authentication](https://firebase.google.com/docs/auth/)
* [NestJS](https://docs.nestjs.com/)
* [Pug](https://pugjs.org/)
* [Bootstrap](https://getbootstrap.com/)
* [SCSS](https://sass-lang.com/)
* [Gulp](https://gulpjs.com/)
* Deploy to [Heroku](https://dashboard.heroku.com/)