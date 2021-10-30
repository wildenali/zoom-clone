# zoom-clone
Create a Zoom Clone with nodejs

# Plan Of Action
- Initialize our NodeJs Project
- Initialize our first view
- Create a room id
- Add the ability to view own Video
- Add ability to allow others to stream their video
- Add styling
- Add the ability to create messages
- Add Stop VIdeo button








# Step step
1. Install npm init
2. Install express
    - npm install express
3. Install nodemon
    - npm install -g nodemon
4. Create server.js and type
    ```
    const express = require('express');
    const app = express();
    const server = require('http').Server(app);

    app.get('/', (req, res) => {
        res.status(200).send("heloww")
    })





    server.listen(3030);
    ```
5. Run server
    - `nodemon server.js`
    - Open in browser localhost:3030
6. Create new directory called 'views'
7. Inside 'views' create file 'room.ejs'
8. Install EJS
    - npm install ejs
9. Install UUID
    - npm install uuid
10. Create new directory called 'public'
11. Inside 'public' create file 'script.js'
12. Install SocketIO
    - npm install socket.io
