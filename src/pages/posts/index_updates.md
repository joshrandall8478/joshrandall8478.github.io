---
title: 'Index Expansion'
date: "12/31/23"
author: "Joshua Randall"
description: 'Updates to the landing page.'
image:
    url: 'https://staticg.sportskeeda.com/editor/2023/09/d6dc9-16953963622489-1920.jpg'
    alt: 'Gojo Domain Expansion'
layout: ../../layouts/BlogLayout.astro
draft: false
---

I have made a few significant changes to the landing page of <a href="/">the main site</a>, by finally adding two extra sections that automatically change to the latest post/project that has been pushed to the site.

![Index Section Code](/public/assets/231231_18h35m30s_screenshot.png)

By using a couple of asyncronous functions in the frontmatter of the index page, we can grab the latest post in the array and the data associated with it. If you are curious to see how it works in its entirety, the code is publically available in [the site's Github Repository](https://github.com/joshrandall8478/joshrandall8478.github.io).

I also added a couple of template markdown files so that it is easier for me to create posts in the future.

Example:
```markdown
---
title: 'Title'
date: "M/DD/YY"
author: "Joshua Randall"
description: 'Description'
image:
    url: 'Image URL'
    alt: 'Image Description'
layout: ../../layouts/BlogLayout.astro
draft: true
---

Enter page content here

```