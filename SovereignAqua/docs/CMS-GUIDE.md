# CMS Guide

## SovereignAqua Research & Development Foundation

### Version 1.0.0

---

# Course Overview

This guide explains how the Content Management System (CMS) is integrated into the SovereignAqua platform.

The project uses **Decap CMS**, an open-source Git-based content management system that allows administrators to edit website content without directly modifying HTML, CSS, or JavaScript files.

---

# What is a CMS?

CMS stands for **Content Management System**.

A CMS allows authorized users to:

* Edit website pages
* Publish research articles
* Manage projects
* Upload media
* Update navigation
* Maintain news and events

without editing the source code.

---

# Why Decap CMS?

The SovereignAqua platform uses Decap CMS because it:

* Works directly with GitHub.
* Stores content as Markdown and YAML files.
* Does not require a traditional database.
* Integrates well with static websites.
* Supports editorial workflows.

---

# CMS Architecture

```text
Administrator

↓

Decap CMS

↓

GitHub Repository

↓

Website Content

↓

Public Website
```

Content changes are committed to the repository and then published with the website.

---

# Project Structure

The CMS is located in the `/admin` directory.

```text
admin/

├── index.html

└── config.yml
```

### Files

#### `index.html`

Loads the Decap CMS application in the browser.

#### `config.yml`

Defines:

* Backend
* Collections
* Media folders
* Editable fields
* Publishing workflow

---

# Backend Configuration

Current backend:

```yaml
backend:
  name: github
  repo: emenoghaebube21-eng/sovereignaqua-research-development-foundation
  branch: main
```

This tells Decap CMS where content is stored.

---

# Media Management

Media files are uploaded to:

```text
assets/images/uploads/
```

Recommended organization:

```text
uploads/

├── documents/

├── gallery/

├── leadership/

├── news/

├── partners/

├── projects/

├── research/

└── videos/
```

---

# Collections

Collections define what content can be managed.

Current collections include:

* Homepage
* Research
* Projects
* Partnerships
* Leadership
* News
* Events
* Documents
* Gallery
* Site Settings
* Navigation
* Footer
* SEO

Each collection contains fields that correspond to editable content.

---

# Content Workflow

Typical workflow:

```text
Administrator

↓

Open CMS

↓

Edit Content

↓

Save

↓

Commit Changes

↓

GitHub Repository Updated

↓

Website Rebuilt

↓

Public Website Updated
```

---

# Best Practices

Always:

* Use descriptive titles.
* Upload optimized images.
* Keep file names meaningful.
* Review changes before publishing.
* Maintain consistent formatting.

---

# Security Considerations

* Limit CMS access to authorized users.
* Use strong GitHub authentication.
* Protect administrative credentials.
* Review content before publication.

---

# Troubleshooting

## CMS does not load

Check:

* `admin/index.html`
* `config.yml`
* GitHub authentication
* Browser console

## Images do not appear

Verify:

* Upload path
* File name
* Image format

## Content is not updating

Check:

* Commit status
* GitHub branch
* Build process
* Browser cache

---

# Future Enhancements

Planned improvements include:

* Role-based permissions
* Scheduled publishing
* Media optimization
* Content preview
* Version comparison
* Workflow approvals

---

# Summary

The CMS separates **content** from **presentation**.

Developers focus on the code.

Content editors focus on the information.

This separation makes the SovereignAqua platform easier to maintain and scale.

---

# Next Course

Continue with:

**DEPLOYMENT.md**

This document explains how to publish the platform for public access.

---

# Revision History

| Version | Description                      |
| ------- | -------------------------------- |
| 1.0.0   | Initial CMS guide documentation. |
