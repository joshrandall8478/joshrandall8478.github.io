---
title: 'Authentik Security Requirements Change'
date: "7/13/24"
author: "Joshua Randall"
description: "Updates to Authentik security requirements for new and existing users."
image:
    url: '/assets/Authentik Post.png'
    alt: 'Authentik logo in front of forest'
layout: ../../layouts/BlogLayout.astro
draft: false
unlisted: false
---
In May 2024, we rolled out a new SSO provider for signing into all JRH services (except Vaultwarden). This was to allow more simplicity for our users since they would in theory only have to remember one account, one password, for all enrolled services. This also allows easier permission handling, service access handling, and basic security options like 2FA/TOTP. This also allows for more recent security technology like passkeys/web authentication, and stronger technology like hardware keys. This also allows us to potentially have oauth login options like with Discord, Apple, Google, or otherwise.

At launch we had what we thought was standard, but strong security requirements: such as a strong password requirement, and all accounts being forced to have TOTP or passkeys, as well as backup/static keys. Today we are dropping the TOTP/Passkey requirement for regular users, since the password requirement may be strong enough. I made this decision based off having difficulty onboarding new and existing users, since I am finding that unfortunately some people may not have one time password clients (e.g. Authy, Google/Microsoft Authenticator, etc.). If a new user wishes to enable two factor on their account, they now must head to the [Authentik dashboard](https://sso.joshrandall.net/) if they wish to enroll MFA devices. They are also advised to <b><u>create static/recovery keys as well</u></b>, and store them somewhere safe in a password manager like Vaultwarden or otherwise.

We hope to transfer most of our users over to Authentik by the end of the year, and potentially force a migration either at the end of 2024 or somewhere in 2025.

Thank you for contributing to JRH!