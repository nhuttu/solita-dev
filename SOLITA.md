# Comments on the exercise

This SOLITA.md is my comments on the exercise and what has been done.
For a technical overview and a guide on how to run the project, read README.md in the root directory.

## Features done

* Import data from the CSV files to a database or in-memory storage (DONE)
* Validate data before importing (DONE)
* Don't import journeys that lasted for less than ten seconds (DONE)
* Don't import journeys that covered distances shorter than 10 meters (DONE)

### Journey list view

* List journeys (DONE)
  * If you don't implement pagination, use some hard-coded limit for the list length because showing several million rows would make any browser choke (DONE)
* For each journey show departure and return stations, covered distance in kilometers and duration in minutes (DONE)

#### Additional

* Pagination (DONE)
* Ordering per column (NOT DONE)
* Searching (NOT DONE)
* Filtering (DONE: you can filter by return station finnish name and departure station finnish name)

### Station list

#### Recommended

* List all the stations (DONE)

#### Additional

* Pagination (NOT DONE: perhaps I should've done it for this too. There was only 457 rows in the station csv but still.)
* Searching (DONE: search via finnish name of the station)

### Single station view

#### Recommended

* Station name (DONE)
* Station address (DONE)
* Total number of journeys starting from the station (DONE)
* Total number of journeys ending at the station (DONE)

#### Additional
* Station location on the map (NOT DONE: should have done this in hindsight, seemed interesting but didn't seem that difficult)
* The average distance of a journey starting from the station (DONE)
* The average distance of a journey ending at the station (DONE)
* Top 5 most popular return stations for journeys starting from the station (DONE)
* Top 5 most popular departure stations for journeys ending at the station (DONE)
* Ability to filter all the calculations per month (NOT DONE)

## Surprise us with

* Endpoints to store new journeys data or new bicycle stations (DONE)
* Running backend in Docker (DONE)
* Running backend in Cloud (NOT DONE)
* Implement E2E tests (Backend tests done)
* Create UI for adding journeys or bicycle stations (DONE)

----------------------------------------

### Last comments

So most features are done and I decided to do extra. From the frontend, you can directly send the CSV file (station or journey), and it will be inserted to the database. Validation of the CSV file has been implemented. Also for notifications, I built an Alert component that is used in multiple places to notify the user of events. You can create new stations or journeys from the frontend and all data is validated so no wrong information goes in. I wanted to do more stuff for this but unfortunately I don't have the time! I faced multiple bugs but most of them I conquered and some of them I bypassed.

Please bear in mind, I am by no means a designer, but I tried my best to give the UI at least some sensible UX. But all in all, the design in my own words is horrible. 

The stack for this project was mostly familiar. I haven't used Express and Node for so many months as my work project has GraphQL and NestJS. I miss GraphQL now that I touched Express again, GraphQL seems a lot more practical. I also put the backend in a Docker image. React I am very familiar with and have deep knowledge of. TypeScript as well, I have only been using TypeScript for a bit less than a year. React Query I hadn't used but it's quite straight forward. TailwindCSS was completely new to me and I wanted to give it a try because I've only been writing CSS so far. After this short testing period I would say CSS is much more easily approachable and more sensible to have in larger teams.

Hopefully this provided good insight and I'm hoping everything was good. Thank you for reading.


