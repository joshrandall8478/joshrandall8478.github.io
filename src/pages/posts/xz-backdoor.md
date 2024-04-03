---
title: 'About the Linux XZ backdoor'
date: "4/3/24"
author: "Joshua Randall"
description: "How the XZ backdoor affects JRH, and everyone who uses linux"
image:
    url: 'https://www.kali.org/blog/xz-backdoor-getting-started/images/xz-backdoor-getting-started.jpg'
    alt: 'Kali Linux XZ backdoor getting started thumbnail'
layout: ../../layouts/BlogLayout.astro
draft: false
unlisted: false
---

## Facts
At the time of writing this, here is what we know:
- The XZ backdoor was discovered in the `xz` and `lib32-xz` package, which is used to compress and decompress files in the xz format.
- The vulnerability affects `sshd`, which is a systemd process that is used to manage SSH connections.
- The backdoor is a remote code execution vulnerability, which means that an attacker can execute arbitrary code on a target system.
- The vulnerability is not present in the GitHub repositories, but is present in the official release tarballs. These tarballs were signed by Jia Tan, one of the maintainers of the `xz` project. The original maintainer, Lasse Collin, was not aware of the backdoor.
- The vulnerability only activates if your environment meets specific requirements. Some of these requirements include:
  - Your system must be running Linux x86_64.
  - Your system must be running systemd.
  - The backdoor targets Debian and Redhat based systems.
- **The backdoor is in versions 5.6.0 and 5.6.1, the recommended action is to either update past these versions if your distribution provides a patch or to downgrade back to 5.4.6**.
- This vulnerability is classified as a 10/10 on the CVSS scale, which is the highest possible score. (CVE-2024-3094)

If you run stable release distros (Ubuntu, Fedora, Debian, openSUSE Leap): You are not affected. This vulnerability was caught early to where the versions that would be affected are not in stable release distros.

If you run rolling release/unstable distros (Debian unstable, openSUSE Tumbleweed, Arch, Fedora Rawhide): You are affected. You should update to your distros patch or downgrade to 5.4.6.

The backdoor (as far as we can tell) does not seem to target Arch or Gentoo based distributions. It is still best to downgrade or update to patch.

## How this affects JRH
JRH mainly runs stable release distros to host services. We only have one node that is running Arch. My personal computers, and that one node has had the backdoor addressed (mostly downgrading the service) and has a package hold in place to prevent the packages from updating.

No data loss or unauthorized access has been detected on any of our systems.

## What you should do
If you run linux servers or desktops, you absolutely should update or downgrade your `xz` and `lib32-xz` packages. If you are running a stable release distro, you are not affected. If you are running a rolling release or unstable distro, <u><b>you are affected and must take action</b></u>.

## Do I have the backdoor?

If you are running `xz` and `lib32-xz` versions 5.6.0 or 5.6.1, you have the backdoor and must downgrade or update to patch.

How this situation is handled, will determine the future of open source software and the operation of Linux distributions as we know it. This is a critical moment for the Linux community.

### Sources:
- [Mental Outlaw Video](https://youtu.be/044GiRqGebc?si=LSh8Os206Jw5fWty)
- [Low Level Learning -  revealing the features of the XZ backdoor ](https://youtu.be/vV_WdTBbww4?si=eTYtiIP8SHJ3HU6u)
- [Low Level Learning - SSH backdoor in xz](https://www.youtube.com/watch?v=jqjtNDtbDNI)
- [Low Level Learning - Linux backdoor is absolutely insane](https://youtu.be/ixn5OygxBY4?si=JSx2mBpmaMNZI76Y)
- [Fireship -  Linux got wrecked by backdoor attack](https://www.youtube.com/watch?v=bS9em7Bg0iU)
- [Kali Linux Blog](https://www.kali.org/blog/xz-backdoor-getting-started/)
