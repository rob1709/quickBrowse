#!/bin/bash

# Exit on any error
set -e

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Install jq if not installed
if ! command_exists jq; then
  echo "jq is not installed. Installing..."
  # Install jq using Homebrew
  brew install jq
else
  echo "jq is already installed."
fi

# Define your folders and files
BUILD_FOLDER="build"
RELEASE_FOLDER="releases"
VERSION_FILE="public/manifest.json"
ZIP_RELEASE_NAME="release.zip"
CODE_ZIP_NAME="code.zip"

# Get the version number from manifest.json
version=$(jq -r '.version' "$VERSION_FILE")
if [ "$version" == "null" ]; then
  echo "Version number not found in $VERSION_FILE"
  exit 1
fi

# Build the project
npm run build

# Create the releases folder with version number
mkdir -p "$RELEASE_FOLDER/$version"

# Compress the contents of the build folder (not the folder itself)
cd "$BUILD_FOLDER" || exit
zip -r "../$RELEASE_FOLDER/$version/$ZIP_RELEASE_NAME" ./* # Note the '.' and '../' usage
cd - || exit

# Create a zip file of specified items
zip -r "$RELEASE_FOLDER/$version/$CODE_ZIP_NAME" \
  cucumber.js \
  features \
  package.json \
  public \
  README.md \
  src \
  tsconfig.json
echo "Created code zip at $RELEASE_FOLDER/$ZIP_CODE_NAME"

echo "Build process completed successfully."