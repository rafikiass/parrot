# parrot
Notification system with socket io, express js and Reactjs
This system is built as a proof of concept for a notification system using express js and socket io. For the app view layer, 
this app uses Reactjs. 

To start the app:
1. Clone repo
2. Run yarn add/npm install (Although I commit node modules, will remove them)
3. Then cd to client folder and run yarn add/ npm install
4. Start reactjs dev server (yarn start/npm start)
5. Start node/express js server PORT=3001 node bin/www on linux/mac -- for windows suckers: set PORT=3001 && node bin/www -- I have not tried this windows command yet
6. Register your app
7. Send curl command/postman etc:
curl -X POST -H "Content-Type: application/json" -d '{"appName":"Ceres", "version": "125-aaaa.war", "message":"New features just got deployed! yeah! yeah, please log out and log back in"}' http://localhost:3001/createNotificationMessage --verbose


You must install mongodb for this to work.
