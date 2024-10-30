---
title: 'Drone Project'
date: "10/30/24"
originalDate: "10/30/24"
subtitle: "Database project for school"
image:
    url: '/assets/Drone%20Project/IMG_3990.jpeg'
    alt: 'Drone hovering'
layout: ../../layouts/ProjectLayout.astro
tools: ["python","github","docker","database","php"] # An array of used languages and coding tools
draft: false
unlisted: false
---
This is a group project I am currently working on for my database course. The end goal is to create an "obstacle course", and have users compete to get the lowest time and see if they can reach the leaderboard for the fastest completion.

The project is written in Python, and uses a MySQL database to store the user information and the leaderboard. The SQL database is hosted on a Docker container (using docker compose), and the front end to view the database is written in PHP.

The drones that are being used are Codrone EDU drones, that are programmed using Python. 

Our first milestone for the project was testing the drone's connection to the database and sensors, and practice SQL integration with Python and front end display with PHP.

---

## Program Flow (Milestone 1)
First, the user will start the main program (we may containerize this in docker to make things easier for end users).

![Starting Program](/assets/Drone%20Project/Untitled.png)
<figcaption>Starting the program</figcaption>

The user will then fly the drone, while the drone collects data.

![Flying the drone](/assets/Drone%20Project/IMG_3990.jpeg)
<figcaption>Flying the drone</figcaption>

Once the user has safely landed, the data collection will stop. The program will then send the data to the database, and the user can view the data using PHP.

![Data sent to database](/assets/Drone%20Project/Untitled%202.png)
![Database](/assets/Drone%20Project/database.png)
![Database Frontend](/assets/Drone%20Project/Untitled3.png)

---

This is a project that I will be working on for the rest of the semester, and hopefully will get it to the point where it can be presented at symposium.