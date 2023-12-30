---
title: 'Site changes'
date: "12/30/23"
author: "Joshua Randall"
description: 'Upgrades to main site'
image:
    url: 'https://prorecognition.in/wp-content/uploads/2020/05/Blog-article-Image-716-x-444-b.jpg'
    alt: 'Smiling engineer'
layout: ../../layouts/BlogLayout.astro
---
I spent some time working on the site while I was with family. Here are all the changes made:
<br>

- Posts display nicely on mobile for once in <a href="/posts">posts</a> and <a href="/projects">projects</a>.
    - <a href="/projects">Projects</a> now exists.
        - <a href="/projects/meloetta">Meloetta</a> is now under the projects page. The page will be updated as the project progresses.
    - Page navigators exist ([paginators](https://rimdev.io/creating-a-pagination-component-with-astro)) for both of these pages to account for more posts being added in the future.
- `code blocks` are now supported in markdown posts like this one, for future code references.
- Cleaned up and organized CSS properties.
- Blogs are now named Posts, this change may not reflect on every file in the repository.
- Made it so that the <span style="padding: 2px;border-radius:15px;" class=button>button</span> class was globally accessible, mainly in use for posts.