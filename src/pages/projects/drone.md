---
title: 'Drone Project'
date: "3/25/25"
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

## Web design and checkpoints (Milestone 2)

At the end of the Fall 2024 semester, we got the project to a point where we could start working on the web design and the in real life checkpoints for the drone. The PHP website directly connects to the MySQL database, and displays the data in a table format. The drone program has checkpoints that the pilot must fly to in the correct order to complete the course. If the pilot successfully completes the course: it will send the time and user data to the database and display the time on the website, which acts as our "leaderboard". 
<video muted=true autoplay=true controls=true playInline=true loop=true src="/assets/Drone_Demo.mp4"></video>

---

## Symposium

Our project was accepted into the 45th annual [EMU Undergrad Symposium](https://www.emich.edu/undergraduate-symposium/index.php). More will be updated here once the event completes.