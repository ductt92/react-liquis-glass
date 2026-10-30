#!/bin/sh
# Builds the static Storybook and force-pushes it to the gh-pages branch (GitHub Pages).
set -e
cd "$(dirname "$0")/.."
npx storybook build -o storybook-static --quiet
touch storybook-static/.nojekyll
cd storybook-static
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -qm "Deploy Storybook"
git push -q --force "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
echo "Deployed: https://ductt92.github.io/react-liquis-glass/"
