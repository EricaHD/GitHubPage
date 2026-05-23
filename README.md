# GitHub Page

## Description

This is a repository that can serve as boilerplate for a GitHub page. The repository comes with Python backend using Flask, but for now the backend can only be run/used locally.

This project uses
- TypeScript (for frontend)
- React (for UI)
- [Material UI](https://mui.com/material-ui/) (an open-source React component library)
- Babel (for JavaScript transpiling)
- Webpack (for bundling)
- GitHub Actions (for deploying)
- Pre-commit (for code quality checks)
- Prettier (for autoformatting)
- Eslint (for linting)
- Jest (for testing)
- Python (for backend)
- Flask (for web framework)

## Setup

These steps only need to be done once (or whenever dependencies change).

1. Clone this repository
2. Navigate to `GitHubPage` and install frontend dependencies with `npm install`
3. Navigate to `GitHubPage/backend` and create a virtual environment with `python -m venv venv` and activate the virtual environment with `source venv/bin/activate` and install dependencies with `pip install -r requirements.txt`
4. Run `pre-commit install` to make sure pre-commit hooks run automatically on each commit
5. Navigate to https://github.com/<YourUserName>/GitHubPage/settings/pages and select `GitHub Actions` from the dropdown menu in the "Build and deployment" section.  You'll need to create your own workflow; it should match the contents of `.github/workflows/release.yml`

There are likely other one-time installations that I've accidentally omitted from this list.

## Local Development

To run app locally:
1. Open tab 1 and navigate to `GitHubPage/backend`
2. Activate the Python virtual environment: `source venv/bin/activate`
3. Start the backend server: `FLASK_ENV=development python app.py` (runs on http://localhost:5001)
4. Open tab 2 and navigate to `GitHubPage`
5. Run the frontend: `npm start` (http://localhost:8080 should open automatically)

To run unit tests locally:
1. In the project directory, run `npm test`

## How the GitHub Page Works

When a commit is pushed to the `main` branch, dependencies are installed via `npm ci`, unit tests are run via `npm test`, the project is built using `npm run build`, the `dist` directory is uploaded, and the deploy occurs.  These steps are outlined in the GitHub Action file located at `.github/workflows/release.yml`.

Note that `npm run build` is a script defined in `package.json`.  The script invokes Webpack, which bundles JavaScript files for use in a browser.  You can see the details of Webpack's process in `webpack.common.ts`.  Most notably, the `bundle.js` file is output in the `dist` directory.  The `dist` directory also contains an `index.html` file that relies on this bundle, and it is the `index.html` file that GitHub pages looks for.  Hence an important step of the GitHub action described in the paragraph above is uploading the `dist` directory.

## Ideas for Improvements

- [ ] Upgrade to React 19
- [ ] Deploy backend to production
- [ ] Add end-to-end testing
