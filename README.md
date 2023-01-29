# Stations and journeys 

This is the project README.md.
For my comments about the exercise for Solita people, read SOLITA.md, thank you.

My coding exercise for Solita Dev Academy

The project consists of two folders: backend and frontend

## What you need to run the project

Node (my version v16.13.2)
Optional: Docker (v.20.10.21) and Docker Desktop
My device: MacBook


### How to run the program?

In the root directory, a package.json exists with a few dependecies to run the program concurrently.

In the root directory, you have two options:

```npm run app``` and ```npm run app:docker```

The first command will run both the frontend and backend concurrently with their builds.
The command will install dependecies needed, build the files, and then host them.

The latter command will do the same, but the backend is ran in a docker image. The command will run the backend with the command
```docker compose up``` which will build the image from the Dockerfile in backend and host it. For this you need to have Docker installed and 
Docker Desktop running.

## Frontend

Frontend is built with React v18 and TypeScript.

For API calls, React Query is used. For styling, TailwindCSS was used. This was my first time using both.
React Query was positive, but TailwindCSS leaves me mixed feelings.

App was built with React Router.

Frontend has a views folder that has all the code logic for the respective views. Modals folder has modals (only one modal).
Utils has utility files.

No tests exist for the frontend.

Navigate to the frontend folder.

To build the React project, run: ```npm run build```

This will install you the dependencies and build the project.

To run the builded project, navigate to the root directory and run: ```prod:frontend```

This will serve the built frontend on port 3000.

To run the frontend in dev mode, in the frontend directory run: ```npm run start```

## Backend

Backend is built with Node and Express using TypeScript. All backend endpoints can be found in the folder "routes" and their respective services in the "services"
folder. Backend also has tests folder, utils folder and a database folder. 

Rudimentary tests exist for the backend and tests can be found in "tests" folder. 

Navigate to the backend folder.

To run the tests, run: ```npm run test```

Remember to first install packages with: ```npm run ci```

To get a built version of the backend, run: ```npm run build```

The built code can be found in the folder "build". 

To run the built code, run: ```npm run start```

Locally the backend is of type better-sqlite3. I used TypeORM to handle the "talking" with the database. I had to resort to a few SQL querys to handle things because I couldn't figure out a way to do it with TypeORM (perhaps my own incompetence).

Project will be on port 3003 unless otherwise configured.

