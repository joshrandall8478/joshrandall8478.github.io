---
title: 'Editing Commits with Git Interactive Rebasing'
date: "9/7/25"
author: "Joshua Randall"
description: "How to edit commits with interactive rebasing in git."
image:
    url: 'https://github.blog/wp-content/uploads/2024/06/AI-DarkMode-4.png?resize=800%2C425'
    alt: 'Github'
layout: ../../layouts/BlogLayout.astro
draft: false
unlisted: false
---
I cannot find any other resources that cover this part of git rebasing, but this is important.

Sometimes while working on a project, another project member or yourself may commit and push something accidentally that you didn't want to have added to the repository. This can be something sensitive like API secrets, plain text credentials, or other sensitive information. Removing these secrets and making a new commit may not be enough, since the secret is permanent in the git commit history. How do we effectively rewrite history itself, and remove the secret completely from the repository's commit history?

Enter **git interactive rebasing**.

Say if you want to edit a **specific** commit and use `git rebase -i` to do so, you may find that the commit that you
select won't be added in the list of commits to edit.
![](/assets/Screenshot_20250901_094838.png)
![](/assets/Screenshot_20250901_095043.png)
![](/assets/Screenshot_20250901_095152.png)

If we include `~` at the end of the commit, it will allow us to include the commit in the interactive rebasing dialogue.
```
git rebase -i 54ae342~
```
![](/assets/Screenshot_20250901_100035.png)

This is because `~` represents the **range of commits** for rebasing. Once we make our modifications, we can follow up with `git commit --amend`. To edit/remove a commit like this, force pushing is required. Make sure to talk with everyone involved in the project + review all changes before force pushing.

Here is an example video.
<br>
<video controls muted>
<source src="/assets/git rebase.mp4"></video>