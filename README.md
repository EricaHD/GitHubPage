# GitHub Page

## Description

This is a repository that can serve as boilerplate for a GitHub page.  This project uses
- TypeScript
- React
- [Material UI](https://mui.com/material-ui/) (an open-source React component library)
- Babel (for JavaScript transpiling)
- Webpack (for bundling)
- GitHub Actions (for deploying)
- Pre-commit (for code quality checks)
- Prettier (for autoformatting)
- Eslint (for linting)
- Jest (for testing)

## Setup

These steps only need to be done once.
1. Run `pre-commit install` to make sure pre-commit hooks run automatically on each commit
2. Navigate to https://github.com/<YourUserName>/GitHubPage/settings/pages and select `GitHub Actions` from the dropdown menu in the "Build and deployment" section.  You'll need to create your own workflow; it should match the contents of `.github/workflows/release.yml`

There are likely other one-time installations that I've accidentally omitted from this list.

## Local Development

To run webpage locally:
1. Clone this repository
2. In the project directory, run `npm install`
3. In the project directory, run `npm start` and http://localhost:8080 should open automatically

To run unit tests locally:
1. In the project directory, run `npm test`

## How the GitHub Page Works

When a commit is pushed to the `main` branch, dependencies are installed via `npm ci`, unit tests are run via `npm test`, the project is built using `npm run build`, the `dist` directory is uploaded, and the deploy occurs.  These steps are outlined in the GitHub Action file located at `.github/workflows/release.yml`.

Note that `npm run build` is a script defined in `package.json`.  The script invokes Webpack, which bundles JavaScript files for use in a browser.  You can see the details of Webpack's process in `webpack.common.ts`.  Most notably, the `bundle.js` file is output in the `dist` directory.  The `dist` directory also contains an `index.html` file that relies on this bundle, and it is the `index.html` file that GitHub pages looks for.  Hence an important step of the GitHub action described in the paragraph above is uploading the `dist` directory.

## Ideas for Improvements

- [ ] Upgrade to React 19
- [ ] Add Python backend with Flask microservice; host with Vercel free tier
- [ ] Add end-to-end testing
