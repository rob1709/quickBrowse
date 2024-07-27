# QuickBrowse

## Overview 

Firefox extension to allow quick navigation to bookmarked web pages via keyboard shortcuts.

https://github.com/user-attachments/assets/b7e09e7d-afe9-4d9d-9139-bc393b8a414e

## Dynamic Bookmarks

Dynamic bookmarks allow you to replace part of a bookmark when using a shortcut:

https://github.com/user-attachments/assets/245ff8d9-30c4-4bb5-91a4-f207deb43d5e


# Build / Release Guide

From the root folder, run:

./build.sh

This will generate folder releases/{versionNumber}, e.g. releases/2.2.1.

Go to https://addons.mozilla.org/en-GB/developers/addon/quickbrowse/edit.

Upload release.zip as the new version of the extension, and code.zip as the source code

Add the following review notes:

From root, do npm run build, and use index.html as the add-on.
I used npm version 9.5.1, node version 18.16.0

# Dev Guide

- Make code changes as you would for any React app.
- Use `npm run build` to build the project following your changes.
- In Firefox:
  - Open the **Debugging** tab (by typing `about:debugging` in the address bar).
  - Click on the **This Firefox** tab.
  - Click on **Load Temporary Add-on**.
  - Select the `index.html` file from the `build` directory of your project.
 
# Test Guide

Tests are written as BDD tests using cucumber. These can be found in the `features` folder (with step definitons in `step-definitions`). Run with `npm run test`, or using the various extensions listed in the .vscode/extensions.json file:

<img width="383" alt="image" src="https://github.com/user-attachments/assets/9cbfa62d-84bc-4d40-a518-64a4264d7012">
