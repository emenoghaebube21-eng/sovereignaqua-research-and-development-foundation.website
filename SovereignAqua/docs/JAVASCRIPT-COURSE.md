# CSS Course

## SovereignAqua Web Development Academy

### Version 1.0.0

---

# Course Overview

Welcome to the CSS Course for the SovereignAqua Research & Development Foundation project.

This course teaches the principles of Cascading Style Sheets (CSS), the language used to control the appearance and layout of webpages.

By the end of this course, you will be able to design modern, responsive, accessible, and maintainable user interfaces.

---

# Learning Objectives

After completing this course you should be able to:

* Understand how CSS works.
* Connect CSS to HTML.
* Use selectors correctly.
* Style text, backgrounds, and layouts.
* Understand the CSS Box Model.
* Build responsive webpages.
* Create reusable components.
* Apply animations and transitions.
* Organize CSS using a modular architecture.

---

# What is CSS?

CSS stands for:

**Cascading Style Sheets**

CSS controls how HTML elements are displayed.

Think of a house:

* HTML builds the structure.
* CSS paints and decorates the house.
* JavaScript adds interaction.

Without CSS, webpages would display only plain text and basic elements.

---

# Connecting CSS

Link your stylesheet inside the `<head>` section of every HTML page.

```html
<link rel="stylesheet" href="assets/css/style.css">
```

---

# CSS Syntax

Every CSS rule contains:

```css
selector{

    property:value;

}
```

Example:

```css
h1{

    color:#00E7FF;

}
```

---

# Selectors

## Element Selector

```css
p{

    color:white;

}
```

Styles every paragraph.

---

## Class Selector

```css
.hero-title{

    color:#00E7FF;

}
```

Used for reusable styles.

---

## ID Selector

```css
#hero{

    background:#02111F;

}
```

IDs should be unique on each page.

---

# Colors

Example:

```css
color:#FFFFFF;

background:#02111F;
```

Use CSS variables whenever possible.

Example:

```css
:root{

    --primary:#00E7FF;

    --background:#02111F;

}

body{

    background:var(--background);

}
```

---

# Typography

Example:

```css
h1{

    font-size:60px;

    font-weight:700;

    text-align:center;

}
```

Important properties:

* font-size
* font-family
* font-weight
* line-height
* text-align

---

# The CSS Box Model

Every HTML element is a box.

```text
Margin

↓

Border

↓

Padding

↓

Content
```

Understanding the Box Model is essential for building layouts.

---

# Margin

Creates space outside an element.

```css
section{

    margin-top:40px;

}
```

---

# Padding

Creates space inside an element.

```css
section{

    padding:60px;

}
```

---

# Border

Example:

```css
.card{

    border:1px solid white;

}
```

---

# Display

Common values:

```text
block

inline

inline-block

flex

grid
```

Later in the course you'll learn Flexbox and CSS Grid in detail.

---

# Flexbox

Used to arrange elements in one direction.

Example:

```css
.container{

    display:flex;

    justify-content:center;

    align-items:center;

}
```

---

# Grid

Used for two-dimensional layouts.

Example:

```css
.grid{

    display:grid;

    grid-template-columns:repeat(3,1fr);

}
```

---

# Responsive Design

Use media queries to adapt layouts.

Example:

```css
@media(max-width:768px){

    h1{

        font-size:40px;

    }

}
```

---

# Animations

Simple transition example:

```css
.button{

    transition:.3s;

}

.button:hover{

    transform:translateY(-5px);

}
```

---

# Organization

Recommended structure:

```text
variables.css

reset.css

layout.css

hero.css

navigation.css

cards.css

forms.css

footer.css

responsive.css
```

---

# Best Practices

Always:

* Use CSS variables.
* Keep selectors simple.
* Avoid duplicate styles.
* Group related rules.
* Comment major sections.
* Build reusable components.

---

# Practical Exercise

Create styles for:

* Header
* Navigation
* Hero Section
* Primary Button
* Footer

Apply spacing, colours, and typography using CSS variables.

---

# Summary

You have learned:

* CSS fundamentals
* Selectors
* Colors
* Typography
* Box Model
* Flexbox
* Grid
* Responsive Design
* Animations
* CSS organization

These concepts will be used throughout the SovereignAqua platform.

---

# Next Course

Continue with:

**JAVASCRIPT-COURSE.md**

There you will learn how to add interactivity and dynamic behaviour to your webpages.

---

# Revision History

| Version | Description                       |
| ------- | --------------------------------- |
| 1.0.0   | Initial CSS course documentation. |
