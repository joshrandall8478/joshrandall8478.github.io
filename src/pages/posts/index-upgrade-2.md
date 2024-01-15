---
title: "There's now GIFS!?"
date: "1/15/24"
author: "Joshua Randall"
description: "More upgrades to the landing page"
image:
    url: 'https://i.gifer.com/MzSm.gif'
    alt: 'A gif of a computer game playing on a 90s PC'
layout: ../../layouts/BlogLayout.astro
draft: false
---
*TLDR: I've been hard at work.*

<br>

I wanted to add more to landing page besides the new two recent sections that show the latest post and projects, so I started by adding a parallax effect to the background of the main section (desktop only). Originally at first I was going to add one image at a time for the background, but I got carried away and realized I could use GIFs. I was only going to use one, but now we have more than 60 GIFs it will randomly choose from on page load.

<br>

### What's been done:
- More than 60 background GIFs to randomly choose from on page load
- Parallax effect on backgrounds (desktop only)
- New contact section on the bottom of the landing page
    - A mail icon that links to my email is in the main social links that performs the same action, for UX.
    - Contact section also has a background, uses the same algorithm as the main section for choosing a GIF.
- Taglines in the main section are now randomly chosen on page load.

<br>

#### Algorithm on how gifs are chosen:

```js
let folder = "/assets/backgrounds/gif/";

let limit = 66;
const format = "gif";

let random = Math.floor( Math.random() * limit ) + 1 ;
let image = folder + random + '.' + format;
document.getElementById("main-section").style.backgroundImage = "url('" + image + "')";

random = Math.floor( Math.random() * limit ) + 1 ;
image = folder + random + '.' + format;
document.getElementById("contact").style.backgroundImage = "url('" + image + "')";
```

<br>

I will probably be more keen on choosing GIFs for certain elements of the site for aesthetical reasons, but in attempts to keep the site clean I will limit the amount of GIFs used. Feel free to give inputs on what you think of the new changes, and if you have any suggestions for the site feel free to contact me 🙏🏼.