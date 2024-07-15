---
title: 'Project Meloetta'
date: "7/15/24"
originalDate: "1/4/24"
subtitle: 'A Lightweight Music Discord Bot'
image:
    url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/648.png'
    alt: 'Meloetta Art'
layout: ../../layouts/ProjectLayout.astro
---

<a href="https://discord.com/api/oauth2/authorize?client_id=922939931729469471&permissions=414501375040&scope=bot"  class=button>Invite Meloetta</a>

> *The name "Meloetta" is tentative and subject to change for obvious copyright reasons. It stands as a temporary placeholder.*

Meloetta is a discord bot that can play music in VC. It's goal is to be simplistic, fast, reliable, and able to play anything from YouTube. The bot is currently in public early access, and is slowly being worked on.

## Changelog from 7/12/24
- Global colors for embed responses are now in `./colors.py`
- AFK timeout will kick the bot from VC after 2 minutes of not playing music, being paused, or being the only one in VC. This is to save bandwidth and make it easier for users.
- Meloetta will now use the OPUS library for voice clients, and should work on any CPU architecture for development with the docker container.
- *Temporarily* fixed major issues with `pytube`. Reference the [RegexMatchError bug](https://github.com/pytube/pytube/issues/1954) and the [merge request that fixes said bug](https://github.com/pytube/pytube/pull/1956) for more information.