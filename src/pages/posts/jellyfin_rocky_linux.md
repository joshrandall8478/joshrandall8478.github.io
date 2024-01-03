---
title: 'JRH Jellyfin on Rocky Linux 9'
date: "1/3/24"
author: "Joshua Randall"
description: "JRH Jellyfin's transition from Ubuntu LTS 22.04 to Rocky Linux 9"
image:
    url: 'https://ciq.com/wp-content/uploads/2022/08/CIQ-Blog_graphic_RL9_opt2.jpg'
    alt: 'Rocky Linux 9'
layout: ../../layouts/BlogLayout.astro
draft: false
---

Our Jellyfin instance went down numerous times over break, mainly due to a mistake I made thinking I could switch Ubuntu LTS to Ubuntu latest. My guess as to what happened, was that this caused major issues to the kernal (which, I didn't think about both Ubuntu versions having separate kernals). This caused the server to crash numerous times, and I was forced to reinstall the OS. A friend who has donated drives and computers to the server (thanks Chris 🙏🏼) suggested me to try [Rocky Linux](https://rockylinux.org/), which is a fork of [CentOS](https://www.centos.org/). At least for right now, I am very pleased with the project (and am definitely pleased with [Cockpit](https://cockpit-project.org/)), especially since things are running very stable at the moment.

I am also very pleased at the fact that I do not have to worry or even think about `/etc/fstab`, since Cockpit has a very nice GUI for managing storage and mounting during boot times.

![Rocky Linux Cockpit Dashboard, Storage Section](/assets/image.png)

### How does this affect users?
- During disaster recovery, there were no signs of lost data that should affect users. No user data or media was lost, since we restored media from the old OS HDD and user data + configurations from `restic` and [BackBlaze](https://backblaze.com) (We avoided the Shibuya incident <img class=emote src='/assets/yuji-shibuya.jpg'>).
- [Meloetta](/projects/meloetta) was also down for a short time since it is on the same server. The bot is now restored and running. 

For anyone who was immediately affected by downtimes, thank you for your continued patience and support. If you are using JRH Jellyfin, please continue to let me know if any issues arise.