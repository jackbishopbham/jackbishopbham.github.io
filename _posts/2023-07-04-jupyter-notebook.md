---
layout: post
title: Test post with jupyter notebook
date: 2025-05-07 09:00:00-0000
description: test example of a blog post with jupyter notebook
tags: formatting jupyter
categories: sample-posts
giscus_comments: true
related_posts: false
---


{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/SE_solver.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/SE_solver.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}

Note that the jupyter notebook supports both light and dark themes.
