---
title: 'Hyprdots Fork'
date: "1/13/24"
originalDate: "1/13/24"
subtitle: "My custom fork of the Hyprdots project"
image:
    url: '/assets/240113_15h58m10s_screenshot.png'
    alt: 'Screenshot of Hyprland Desktop'
layout: ../../layouts/ProjectLayout.astro
draft: false
---

<a class=button href="https://github.com/joshrandall8478/hyprdots">Visit the Repository</a>

## The problem:

As many in the linux community know, [Wayland](https://wayland.freedesktop.org/) is "the future" of displaying content to linux desktops. However, my desktop environment at the time ([KDE Plasma](https://kde.org/plasma-desktop)) does not have the best compatibility with wayland.

Here are a couple of visuals that represent what I was dealing with, just to show a few examples:

![Cursed cursor](https://i.redd.it/mzvaqc66vrp91.jpg)
![Cursed Dolphin](https://preview.redd.it/hiv7e3cfajl81.png?width=1336&format=png&auto=webp&s=a3118c09701c6c2d3fbfc85291a99ba8eeeea07f)

Many applications would also break within KDE wayland, and the taskbar (probably one of the more important parts of the desktop for me) would freeze every 10-30 minutes, where I would have to run a hotkey to refresh the desktop.

## The solution:

### Enter [GNOME](https://www.gnome.org/).

nah just kidding...

### Enter [Hyprland](https://github.com/hyprwm/Hyprland).

*Nothing against GNOME, I have just used it so many times + I don't like GDM. GNOME is a viable Wayland prioritized option.*

Hyprland is a tiling window manager that is only supported in Wayland. I've worked in tiling window managers before, but this would be the first time I gave it a proper shot in a while.

![BSPWM Rice](https://camo.githubusercontent.com/7d5b57eadeeae588ba52851ee8fc3f6bbd02cc5c56ab1517e6f0c831ba7b64af/68747470733a2f2f692e696d6775722e636f6d2f72776d414a38622e706e67)

<figcaption>My BSPWM rice from a while back</figcaption>



Eager to start learning more on how Hyprland works, I wanted to have an easier time getting into it (to save time because of school). I decided to fork the [hyprdots project](https://github.com/prasanthrangan/hyprdots) and make some changes to the default configuration to make it more familiar to me. I have included common wayland fixed, scripts, idle support, some new custom themes, keybinds, and more.

The new themes include:
- Sunrise-Dark
- WhiteSur
- WhiteSur-Dark

![Example of theme](/assets/240113_16h23m45s_screenshot.png)
<figcaption>My custom WhiteSur-Dark theme.</figcaption>

I have also contributed straight to the Hyprdots project, adding modifications to the Spotify widget and functionality to make it more usable (*Fun fact, this is the first public open source project I have directly contributed towards*).

![Spotify Widget](/assets/240113_16h25m48s_screenshot.png)

Feel free to <a href="https://github.com/joshrandall8478/hyprdots">visit the repository</a> here. The original project is also linked in the repository.