---
title: 'Meloetta Changelog 07/12/24'
date: "7/12/24"
author: "Joshua Randall"
description: "Meloetta updates that fix breaking issues."
image:
    url: 'https://www.siliconera.com/wp-content/uploads/2023/12/meloetta-dancing-in-pokemon-indigo-disk.jpg?resize=1200%2C675'
    alt: 'Meloetta in a forrest'
layout: ../../layouts/BlogLayout.astro
draft: false
unlisted: false
---
This is the Meloetta changelog from the private gitlab repository. Changes in a [recent breaking change in the python library pytube](https://github.com/pytube/pytube/issues/1954) rendered the bot going in a loop when either a URL or search term is passed.

![Meloetta Breaking](/assets/meloetta\%20breaking.png)

Fortunately, someone was able to create a [merge request](https://github.com/pytube/pytube/pull/1956) to allow one of our developers and myself to fix these issues. The bot is now back up and running, and we are working on a more permanent solution to this issue.

### Changelog
- [x] Colors are now temporarily in `colors.py`
- [x] AFK timeout will kick the bot from VC after 2 minutes of not playing music, being paused, or being the only one in VC.
- [x] Meloetta will now use the OPUS voice connectivity library, and should work on any CPU architecture with the docker container.
- [x] *Temporarily* fixed major issues with `pytube`

You can learn more or add Meloetta to your server by [clicking here](/projects/meloetta). A fully designed site will be in the works soon, stay tuned.