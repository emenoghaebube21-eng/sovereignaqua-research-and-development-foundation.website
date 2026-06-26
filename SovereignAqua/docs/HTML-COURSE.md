# HTML Course

## SovereignAqua Web Development Academy

### Version 1.0.0

---

# Course Overview

Welcome to the HTML Course for the SovereignAqua Research & Development Foundation project.

This course has been written specifically for beginners and forms the foundation of the entire platform.

By the end of this course, you will understand how HTML is used to build modern, semantic, accessible, and maintainable websites.

---

# Learning Objectives

After completing this course you should be able to:

* Understand the purpose of HTML.
* Build complete webpages.
* Use semantic HTML correctly.
* Organize page layouts.
* Create navigation menus.
* Add images and videos.
* Build forms.
* Create tables.
* Link multiple pages together.
* Prepare HTML for CSS and JavaScript.

---

# What is HTML?

HTML stands for:

**HyperText Markup Language**

HTML is a **markup language**, not a programming language.

Its purpose is to describe the structure of a webpage.

Think of HTML as the blueprint of a building.

Without HTML:

* No headings
* No images
* No buttons
* No forms
* No webpage

---

# Basic Document Structure

Every webpage begins with:

```html
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Page Title</title>

<link rel="stylesheet"
href="assets/css/style.css">

</head>

<body>

</body>

</html>
```

Every HTML page in this project should follow this structure.

---

# Semantic HTML

Use semantic elements whenever possible.

Common semantic elements include:

```text
<header>

<nav>

<main>

<section>

<article>

<aside>

<footer>
```

These elements make the code easier to understand and improve accessibility.

---

# Headings

HTML provides six heading levels.

```html
<h1>Main Title</h1>

<h2>Section</h2>

<h3>Subsection</h3>

<h4>Topic</h4>

<h5>Minor Heading</h5>

<h6>Smallest Heading</h6>
```

Guidelines:

* Use one `<h1>` per page.
* Organize headings in a logical hierarchy.

---

# Paragraphs

Paragraphs are created using:

```html
<p>

This is a paragraph.

</p>
```

Paragraphs should be used for normal body text.

---

# Lists

## Unordered List

```html
<ul>

<li>Research</li>

<li>Projects</li>

<li>Partnerships</li>

</ul>
```

## Ordered List

```html
<ol>

<li>Plan</li>

<li>Build</li>

<li>Test</li>

</ol>
```

---

# Links

Create links using:

```html
<a href="about.html">

About Us

</a>
```

---

# Images

Example:

```html
<img
src="assets/images/logo.png"
alt="SovereignAqua Foundation Logo">
```

Always include descriptive `alt` text.

---

# Comments

Use comments to organize sections.

```html
<!-- Hero Section -->

<!-- Research -->

<!-- Footer -->
```

Comments are ignored by the browser.

---

# Good HTML Practices

Always:

* Use semantic HTML.
* Indent consistently.
* Close all tags.
* Use meaningful file names.
* Write descriptive alternative text for images.
* Keep code readable.

---

# Practical Exercise

Create a webpage containing:

* One `<header>`
* One `<nav>`
* One `<main>`
* Three `<section>` elements
* One `<footer>`

Add headings and paragraphs to each section.

---

# Summary

You have learned:

* What HTML is.
* The basic document structure.
* Semantic HTML.
* Headings.
* Paragraphs.
* Lists.
* Links.
* Images.
* Comments.
* Best practices.

This knowledge forms the foundation for every page in the SovereignAqua platform.

---

# Next Course

After completing this document, continue with:

**CSS-COURSE.md**

There you will learn how to style the HTML pages you've created.

---

# Revision History

| Version | Description                        |
| ------- | ---------------------------------- |
| 1.0.0   | Initial HTML course documentation. |
