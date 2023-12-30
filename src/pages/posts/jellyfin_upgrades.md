---
title: 'Jellyfin Upgrade'
date: "12/29/23"
author: "Joshua Randall"
description: 'Details about Jellyfin upgrade'
image:
    url: 'https://jellyfin.org/images/social.png'
    alt: 'Jellyfin logo'
layout: ../../layouts/BlogLayout.astro
---
The JRH Jellyfin instance has received a number of upgrades going into 2024. The updates include:
- GTX 1060 now being use for hardware transcoding. HVEC transcoding is now supported.
- CPU upgraded to an Intel i7 6th gen.

This will allow for faster load and buffering, as the server now has more power to load and render videos as fast as 600+ frames per second.

- Main OS is now moved to an SSD for faster boot times, loading, and stability. OS SSD is now at 1TB.
- New 2TB HDD for media storage.

Now that we have more storage, please feel free to use [Jellyseerr](https://jellyseerr.joshrandall.net) to request media.

- User data and configuration is now being backed up to Backblaze S3 buckets.

This will allow us to restore user data and configurations quickly if any issues arise, and in the worst case scenario of a drive death.

If you are using the JRH Jellyfin instance, please let me know if you have any issues. We hope you continue to enjoy the service.