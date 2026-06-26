# Coding Standards

## SovereignAqua Research & Development Foundation

**Version:** 1.0.0

---

# Purpose

This document defines the coding standards and best practices for the SovereignAqua Research & Development Foundation project.

Its purpose is to ensure that all source code remains readable, maintainable, consistent, and scalable throughout the lifecycle of the platform.

---

# Core Principles

Every line of code should follow these principles:

* Readability
* Simplicity
* Consistency
* Reusability
* Accessibility
* Performance
* Security
* Maintainability

---

# HTML Standards

## Semantic HTML

Always use semantic elements whenever appropriate.

Preferred elements include:

```text
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

Avoid using `<div>` when a semantic element better describes the content.

---

## Indentation

Use **4 spaces** for indentation.

Example:

```html
<section>

    <h2>Research</h2>

    <p>

        Research content goes here.

    </p>

</section>
```

---

## Naming

Use lowercase file names.

Examples:

```text
index.html
about.html
asset-enrolment.html
research.html
```

Use **kebab-case** for CSS classes.

Examples:

```text
hero-section
glass-card
primary-button
research-grid
```

---

# CSS Standards

## Architecture

Organize CSS into modules.

Example:

```text
variables.css
reset.css
typography.css
layout.css
navigation.css
hero.css
cards.css
forms.css
footer.css
responsive.css
```

---

## Variables

Never hard-code colours repeatedly.

Always use CSS variables.

Example:

```css
:root{

    --primary:#00E7FF;

    --background:#02111F;

}
```

---

## Units

Preferred units:

* `rem` for typography
* `%` for fluid layouts
* `px` where fixed values are appropriate

---

# JavaScript Standards

## Organization

Each JavaScript file should have a single responsibility.

Examples:

```text
navigation.js
hero.js
forms.js
gallery.js
api.js
```

Avoid placing all functionality into one file.

---

## Naming

Use **camelCase** for variables and functions.

Examples:

```javascript
loadHeroVideo();

submitAssetForm();

calculateStatistics();
```

Use **PascalCase** for JavaScript classes.

Example:

```javascript
class NavigationManager{

}
```

---

# Comments

Use comments to describe sections and complex logic.

HTML

```html
<!-- Hero Section -->
```

CSS

```css
/* Hero Section */
```

JavaScript

```javascript
// Hero Section
```

Do not comment every obvious line; focus on explaining structure or non-trivial logic.

---

# Folder Naming

Use lowercase names.

Separate words with hyphens when needed.

Examples:

```text
assets
content
developer-guide
```

---

# File Naming

Examples:

```text
hero.css
navigation.js
asset-enrolment.html
README.md
```

Be consistent with spelling across the project (for example, use **Enrolment** consistently if that is your chosen convention).

---

# Accessibility Standards

Every page should include:

* One `<h1>` element.
* Descriptive heading hierarchy (`h2`, `h3`, etc.).
* Alternative text for images.
* Labels for form controls.
* Keyboard-accessible navigation.
* Sufficient colour contrast.
* Responsive layouts.

---

# Performance Guidelines

* Optimize images before uploading.
* Compress videos for web use.
* Minify CSS and JavaScript for production builds.
* Lazy-load non-critical images and media where appropriate.

---

# Git Commit Messages

Write clear, descriptive commit messages.

Examples:

```text
Initial project structure

Add homepage hero section

Implement responsive navigation

Refactor CSS into modules

Update CMS configuration
```

Avoid vague messages such as:

```text
update

fix

changes
```

---

# Code Review Checklist

Before committing code, confirm:

* HTML is valid and semantic.
* CSS is modular and reusable.
* JavaScript has a single responsibility.
* No duplicate code has been introduced.
* Accessibility has been considered.
* File and class names follow the project conventions.
* Documentation has been updated if the architecture changed.

---

# Learning Philosophy

This project is being developed as both a production platform and a learning resource.

Every new feature should help improve:

* Technical understanding
* Code quality
* Documentation
* Long-term maintainability

The goal is not only to build a working website but also to understand why each implementation decision was made.

---

# Revision History

| Version | Date            | Description                                   |
| ------- | --------------- | --------------------------------------------- |
| 1.0.0   | Initial Release | Established coding standards for the project. |
