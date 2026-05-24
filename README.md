# GitHub Page

## Description

This is a repository that can serve as boilerplate for a GitHub page.

## Tech Stack

<table>
  <tr>
    <th>Category</th>
    <th>Technology</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td rowspan="3">Frontend</td>
    <td>TypeScript</td>
    <td>Frontend programming language</td>
  </tr>
  <tr>
    <td>React</td>
    <td>UI logic and components</td>
  </tr>
  <tr>
    <td>Material UI</td>
    <td>React component library</td>
  </tr>
  <tr>
    <td rowspan="2">Backend</td>
    <td>Python</td>
    <td>Backend programming language</td>
  </tr>
  <tr>
    <td>AWS Chalice</td>
    <td>Framework for writing serverless apps that run on AWS Lambdas</td>
  </tr>
  <tr>
    <td>Infrastructure</td>
    <td>AWS Lambda</td>
    <td>Serverless compute service</td>
  </tr>
  <tr>
    <td>Testing</td>
    <td>Jest</td>
    <td>Frontend unit testing</td>
  </tr>
  <tr>
    <td rowspan="3">Code Quality</td>
    <td>Eslint</td>
    <td>TypeScript linting</td>
  </tr>
  <tr>
    <td>Prettier</td>
    <td>TypeScript autoformatting</td>
  </tr>
  <tr>
    <td>Pre-commit</td>
    <td>Automated code quality checks</td>
  </tr>
  <tr>
    <td rowspan="2">Builds</td>
    <td>Babel</td>
    <td>JavaScript transpiling</td>
  </tr>
  <tr>
    <td>Webpack</td>
    <td>JavaScript module bundling</td>
  </tr>
  <tr>
    <td>Deploys</td>
    <td>GitHub Actions</td>
    <td>CI/CD and automated deployment</td>
  </tr>
</table>

## Setup

These steps only need to be done once (or whenever dependencies change).

General
1. Clone this repository
2. Run `pre-commit install` to make sure pre-commit hooks run automatically on each commit
3. Navigate to `https://github.com/<YourUserName>/GitHubPage/settings/pages` and select `GitHub Actions` from the dropdown menu in the "Build and deployment" section.  You'll need to create your own workflow; it should match the contents of `.github/workflows/release.yml`

Frontend
1. Navigate to `GitHubPage` and install frontend dependencies with `npm install`

Backend
1. Navigate to `GitHubPage/backend` and create a virtual environment with `python -m venv venv` and activate the virtual environment with `source venv/bin/activate` and install dependencies with `pip install -r requirements.txt`
2. Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) if you don't already have it
3. Create an [AWS account](https://aws.amazon.com/console/) (AWS Lambdas have a generous limit in their free tier, so you will not have to spend money)

There are likely other one-time installations that I've accidentally omitted from this list.

## Local Development

To run app locally, run `npm start` in the main directory.  Then http://localhost:8080 should open automatically.

To make changes to the frontend, you can make changes to the TypeScript files and http://localhost:8080 should automatically reload and display the changes.  When changes are ready, you can commit and push your changes to the GitHub repository.  The webpage is built and deployed automatically by a GitHub Action (see section below for details).

To make changes to the backend, you can make changes to the Python files, but in order to see the effect of the changes you must deploy the changes to the AWS Lambda that contains the backend code.  To do that, you navigate to the project directory and run `aws login` to authenticate followed by `chalice deploy --stage prod`.  If you ever need to delete infrastructure created by AWS Chalice (i.e. the lambda and API gateway), you can run `chalice delete --stage prod`.  If you're not sure the AWS Lambda is working, you can run `curl https://vsqpljo4qk.execute-api.us-east-1.amazonaws.com/v1/api/health` from your terminal.

To run unit tests locally, run `npm test` in the main directory.

## How the GitHub Page Works

When a commit is pushed to the `main` branch, a GitHub Action executes several steps, including:
1. Dependencies are installed via `npm ci`
2. Unit tests are run via `npm test`
3. The project is built using `npm run build`
4. The `dist` directory is uploaded
5. The deploy occurs

The complete list of steps is outlined in the GitHub Action file `.github/workflows/release.yml`.

Note that `npm run build` is a script defined in `package.json`.  The script invokes Webpack, which bundles JavaScript files for use in a browser.  You can see the details of Webpack's process in `webpack.common.ts`.  Most notably, the `bundle.js` file is output in the `dist` directory.  The `dist` directory also contains an `index.html` file that relies on this bundle, and it is the `index.html` file that GitHub pages looks for.  Hence an important step of the GitHub action described in the paragraph above is uploading the `dist` directory.

## Ideas for Improvements

- [ ] Upgrade to React 19
- [ ] Don't hardcode API gateway URL in frontend
- [ ] Add testing for Python backend (e.g. with pytest)
- [ ] Add end-to-end testing
- [ ] Pre-commit hooks for Python (black autoformatting, mypy type checking)
- [ ] Make a local server option so we don't have to deploy lambda to test backend changes
- [ ] Make deployment of new backend code via AWS Chalice part of GitHub Action
- [ ] Have Python backend pull from database that is available in AWS free tier, possilby using an ORM like SQLAlchemy
