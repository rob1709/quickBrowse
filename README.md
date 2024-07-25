# QuickBrowse

## Overview 

Firefox extension to allow quick navigation to bookmarked web pages via keyboard shortcuts.

https://github.com/user-attachments/assets/b7e09e7d-afe9-4d9d-9139-bc393b8a414e

# Build Guide

From the root folder, run:

`npm run build`

This generates a build folder. Zip the contents of this (note the contents, not the folder itself; Firefox requires manifest.json to sit in the root once unzipped). 

Upload to Firefox's dev / extension hub: https://addons.mozilla.org. You'll also need to upload the raw source code too. Do this by zipping the contents, excluding build, npm modules, and releases (firefox limit the size of the zipped source folder, could probably exclude more I expect, e.g. package lock etc).

I added the following notes for the review:

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
