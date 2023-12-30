---
title: 'Jellyfin Upgrades'
date: "12/29/23"
author: "Joshua Randall"
description: 'Details about Jellyfin upgrades'
image:
    url: 'https://jellyfin.org/images/social.png'
    alt: 'Jellyfin logo'
layout: ../../layouts/BlogLayout.astro
---
The JRH Jellyfin instance has received a number of upgrades going into 2024. The updates include:
- GTX 1060 now being use for hardware transcoding. HVEC transcoding is now supported.
- CPU upgraded to an Intel i7 6th gen.

<br>

This will allow for faster load and buffering, as the server now has more power to load and render videos as fast as 600+ frames per second.

- Main OS is now moved to an SSD for faster boot times, loading, and stability. OS SSD is now at 1TB.
- New 2TB HDD for media storage.

<br>

Now that we have more storage, please feel free to use [Jellyseerr](https://jellyseerr.joshrandall.net) to request media.

- User data and configuration is now being snapshotted to [Backblaze S3 buckets](https://backblaze.com) using `restic`.

<br>

This will allow us to restore user data and configurations quickly if any issues arise, and in the worst case scenario of a drive death.

- Slideshow banner on main screen can now be navigated.
<br>
<img src="/assets/231230_02h08m55s_screenshot.png">

<br>

The slideshow banner that we introduced a few months ago now sports a carousel navigator to browse through announcements. Clicking on any entry in the navigator resets the countdown.

<br>
<img src="/assets/231230_02h06m32s_screenshot.png">

<br>
<br>

If you are using the JRH Jellyfin instance, please let me know if you have any issues. We hope you continue to enjoy the service.

<br>

<a class=button href="https://jellyfin.joshrandall.net">Go to Jellyfin</a>