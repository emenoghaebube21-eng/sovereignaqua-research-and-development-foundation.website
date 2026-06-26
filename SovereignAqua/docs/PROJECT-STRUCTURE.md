# Installation Guide

## SovereignAqua Research & Development Foundation

**Version:** 1.0.0

---

# Purpose

This document provides instructions for setting up the SovereignAqua Research & Development Foundation project for local development.

It is intended for developers, contributors, and project maintainers.

---

# System Requirements

Before beginning, ensure the following software is installed on your computer.

## Required Software

* Visual Studio Code
* Git
* Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari
* A GitHub account

---

# Recommended Visual Studio Code Extensions

Install the following extensions:

* Live Server
* Prettier – Code Formatter
* HTML CSS Support
* Auto Rename Tag
* Auto Close Tag
* GitLens
* JavaScript (ES6) Code Snippets
* Path Intellisense

These extensions improve productivity and help maintain consistent code quality.

---

# Project Folder Structure

The project should be organized as follows:

```text
SovereignAqua/

├── admin/

├── assets/

│   ├── css/

│   ├── js/

│   ├── images/

│   └── video/

├── content/

├── data/

├── docs/

├── uploads/

├── index.html

└── developer-guide.html
```

---

# Getting Started

## Step 1

Clone or download the repository from GitHub.

## Step 2

Open the project folder in Visual Studio Code.

## Step 3

Review the folder structure and confirm that all required directories and files are present.

## Step 4

Open the integrated terminal in Visual Studio Code.

Shortcut:

```text
Ctrl + `
```

## Step 5

Start a local development server.

If using the Live Server extension:

* Right-click `index.html`
* Select **Open with Live Server**

The browser will open the homepage automatically.

---

# Verifying the Installation

Confirm the following:

* The homepage loads successfully.
* CSS styles are applied.
* JavaScript loads without errors.
* Images display correctly.
* Videos (if added) play correctly.
* Navigation links work.
* The browser developer console shows no errors.

---

# Troubleshooting

### CSS is not loading

* Verify the file path in the `<link>` element.
* Ensure `style.css` exists in `assets/css/`.

### JavaScript is not loading

* Verify the `<script>` path.
* Ensure `app.js` exists in `assets/js/`.

### Images do not appear

* Check that image files are stored in `assets/images/`.
* Verify the image filename and extension.

### Live Server does not start

* Ensure the Live Server extension is installed and enabled.
* Restart Visual Studio Code if necessary.

---

# Development Workflow

When making changes:

1. Update the relevant HTML, CSS, or JavaScript file.
2. Save the file.
3. Refresh the browser (or let Live Server reload automatically).
4. Test the changes.
5. Commit the changes to Git with a clear commit message.

---

# Next Steps

After completing the installation:

* Review the project documentation.
* Learn the coding standards.
* Begin implementing the homepage components.
* Follow the lesson sequence provided in the Developer Guide.

---

# Revision History

| Version | Date            | Description                       |
| ------- | --------------- | --------------------------------- |
| 1.0.0   | Initial Release | First installation guide created. |
