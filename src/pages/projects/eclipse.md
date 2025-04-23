---
title: 'Eclipse'
date: "4/23/25"
originalDate: "4/23/25"
subtitle: "Simple card game made in Unity"
image:
    url: '/assets/eclipse.png'
    alt: 'Eclipse Card game'
layout: ../../layouts/ProjectLayout.astro
tools: ["unity","html", "github"] # An array of used languages and coding tools
draft: false
unlisted: false
---
<a class=button href="https://joshrandall.net/eclipse">Play Eclipse</a>

Eclipse is a card game built for a school project by my team, composed of myself, Anjana Madhavan, and James Meekhoff. I am currently working on making binaries for Linux, MacOS, and Windows, but you can [play the game here](https://joshrandall.net/eclipse) for now.

The game has 5 usable cards (with more to come later), with different special use cases for all of them:
- Attacking: Attack cards deal a range between 1-3 damage, or a chance to do 5 damage with a 30% critical chance.
- Healing: Healing cards heal a range of 1-3 health, or a chance to heal 5 points with a 30% "second wind" rate.
- Shield: Shield cards prevent damage from attack and bludgeoning cards, but cannot prevent piercing and stun.
- Piercing: Piercing do a flat damage of 2 with no chance to do crit damage, but can bypass shield without breaking it.
- Bludgeoning: Bludgeoning is a rare card that does 4 damage flat, and stuns the enemy. This allows you to combo or heal safely.
  - While bludgeoning breaks shield, it will still stun the opponent.

The games aesthetics and mechanics were handled mostly individually:
- Anjana was responsible mainly for the aesthetics and UI flow. This game was mainly her idea, as we were considering an open world game. Once we realized this was too ambitious, she redirected us to doing a card game. She set the aesthetic tone for the game, created the board, added background images, etc. She created the pause menu and the intial title screen layout. She was also responsible for adding 
- James created the cards, and found the sound and music for the game. Him and I worked on getting the right sounds for each action, and making the game sounds feel engaging during play.
- I was responsible for getting the core functionality of the game to work, determining most of the rules, and implementing how the enemy AI functions. I also created the animated title screen that is visible on the web build, compiling and deploying the web build, and extra branding assets for the game.

![Eclipse Game Play](/assets/team6-4.png)

This project started off difficult, but ended up becoming one of the most smoothest projects I have worked on this semester. My team significantly lowered my stress towards the end, and is the reason why the product is this playable today. I plan to continue development on this project over summer, along with either the original team and/or some people of my own.

