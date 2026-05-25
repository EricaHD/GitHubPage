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

### AWS Console

1. Create an [AWS account](https://aws.amazon.com/console/) (AWS Lambdas have a generous limit in their free tier, so you will not have to spend money)
2. Create an OIDC Identity Provider in AWS
   - Go to the AWS IAM Console
   - Navigate to "Identity providers"
   - Click "Add provider"
   - Select "OpenID Connect"
   - Fill in the provider URL with `https://token.actions.githubusercontent.com`
   - Fillin the audience with `sts.amazonaws.com`
   - Click "Add provider"
3. Create an IAM Role for GitHub Actions
   - Go to the AWS IAM Console
   - Navigate to "Roles"
   - Click "Create role"
   - Select "Web identity" as the trusted entity type
   - Select the identity provider you just created: `token.actions.githubusercontent.com`
   - Select the audience `sts.amazonaws.com`
   - Enter your GitHub organization (can just be your GitHub account name if you are not part of an organization)
   - Click "Next"
   - Just for now you can select just the `AWSLambda_FullAccess` policy (we will adjust this shortly)
   - Click "Next"
   - Give the role a name (e.g. `github-actions-deploy-role`)
   - Click "Create role"
   - Make sure you're viewing the role, specifically the "Permissions" tab
   - Click the "Add permissions" dropdown and select "Create inline policy"
   - Select "JSON" for the policy editor and paste in this JSON (make sure you subsitute in your real 12-digit `AWS_ACCOUNT_ID`):
   ```
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "iam:GetRole",
           "iam:PassRole",
           "iam:PutRolePolicy",
           "apigateway:POST",
           "apigateway:PATCH"
         ],
         "Resource": "*"
       },
       {
         "Effect": "Allow",
         "Action": [
           "lambda:GetFunction",
           "lambda:GetFunctionConfiguration",
           "lambda:UpdateFunctionCode",
           "lambda:UpdateFunctionConfiguration",
           "lambda:ListTags",
           "lambda:DeleteFunctionConcurrency",
           "lambda:GetPolicy",
           "lambda:AddPermission"
         ],
         "Resource": "arn:aws:lambda:us-east-1:AWS_ACCOUNT_ID:function:githubpage-prod"
       }
     ]
   }
   ```
   - Click "Next"
   - Enter a policy name (e.g. `update_lambda`)
   - Click "Create policy"
   - Make sure you're viewing the role, specifically the "Permissions" tab
   - Select the `AWSLambda_FullAccess` and click "Remove"
   - Confirm the deletion
4. Configure the trust relationship
   - Go back to the role you just created
   - Click on the "Trust relationships" tab
   - Click "Edit trust policy"
   - Replace the existing policy with the following (make sure you subsitute in your real 12-digit `AWS_ACCOUNT_ID` and your real `GITHUB_ACCOUNT_NAME`)
   ```
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::AWS_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
              "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
           },
           "StringLike": {
             "token.actions.githubusercontent.com:sub": "repo:GITHUB_ACCOUNT_NAME/GitHubPage:ref:refs/heads/main"
           }
         }
       }
     ]
   }
   ```
   - Click "Update policy"
   - Take note of the role ARN, which you will enter into a GitHub secret in the next section

### GitHub

1. Make your own copy of this repository
2. Navigate to `https://github.com/<YourUserName>/GitHubPage/settings/pages` and select `GitHub Actions` from the dropdown menu in the "Build and deployment" section.  You'll need to create your own workflow; it should match the contents of `.github/workflows/release.yml`
3. Navigate to `https://github.com/EricaHD/GitHubPage/settings/secrets/actions` and click "New repository secret".  Enter the name `OIDC_ROLE_TO_ASSUME` and the value `arn:aws:iam::<AWS_ACCOUNT_ID>:role/<ROLE_NAME>`, using your real 12-digit `AWS_ACCOUNT_ID` and the name of the role created in the previous section.  This will allow the GitHub Action (see `${{ secrets.OIDC_ROLE_TO_ASSUME }}` in GitHubPage/.github/workflows/release.yml) to assume a role in your AWS account that has permissions to deploy the backend

### Local

1. Create a local copy of this repository
2. Run `pre-commit install` to make sure pre-commit hooks run automatically on each commit
3. Navigate to `GitHubPage` and install frontend dependencies with `npm install`
4. Navigate to `GitHubPage/backend` and create a virtual environment with `python -m venv venv` and activate the virtual environment with `source venv/bin/activate` and install dependencies with `pip install -r requirements.txt`
5. Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) if you don't already have it

There are likely other one-time installations that I've accidentally omitted from this list.

## Local Development

To run the app locally, open two terminal windows.

In terminal 1:
1. Navigate to backend directory with `cd GitHubPage/backend/`
2. Activate the Python virtual environment with `source venv/bin/activate`
3. Start the backend server with `chalice local`

In terminal 2:
1. Navigate to main project directory with `cd GitHubPage/`
2. Start the Webpack DevServer with `npm start`
3. http://localhost:8080 should open automatically

When you make changes to the frontend, http://localhost:8080 should automatically reload and display the changes.  When you make changes to the backend, you will need to manually refresh http://localhost:8080 for changes to appear.  In neither case should you have to restart the server.

To run unit tests locally, run `cd GitHubPage && npm test`.

## Deploying Changes

To ship changes to the frontend, you can commit and push your changes to the GitHub repository.  The webpage is built and deployed automatically by a GitHub Action.

To ship changes to the backend, you must deploy the changes to the AWS Lambda that contains the backend code using these commands:
```bash
cd GitHubPage/backend/
aws login
chalice deploy --stage prod
```

## How the GitHub Page Works

When a commit is pushed to the `main` branch, a GitHub Action executes several steps, including:
1. Dependencies are installed via `npm ci`
2. Unit tests are run via `npm test`
3. The project is built using `npm run build`
4. The `dist` directory is uploaded
5. The deploy occurs

The complete list of steps is outlined in the GitHub Action file `.github/workflows/release.yml`.

Note that `npm run build` is a script defined in `package.json`.  The script invokes Webpack, which bundles JavaScript files for use in a browser.  You can see the details of Webpack's process in `webpack.common.ts`.  Most notably, the `bundle.js` file is output in the `dist` directory.  The `dist` directory also contains an `index.html` file that relies on this bundle, and it is the `index.html` file that GitHub Pages looks for.  Hence an important step of the GitHub action described in the paragraph above is uploading the `dist` directory.

## Debugging & Deleting the AWS Infrastructure

If you're not sure the AWS Lambda is working, you can run `curl https://pu5sgwc7n1.execute-api.us-east-1.amazonaws.com/v1/api/health` from your terminal.

If you ever need to delete infrastructure created by AWS Chalice (i.e. the lambda and API gateway), you can run these commands:
```bash
cd GitHubPage/backend/
aws login
chalice delete --stage prod
```

## Ideas for Improvements

- [ ] Upgrade to React 19
- [ ] Don't hardcode API gateway URL in frontend (e.g. grep for `pu5sgwc7n1` -- this should not be hardcoded)
- [ ] Add testing for Python backend (e.g. with pytest)
- [ ] Add end-to-end testing
- [ ] Pre-commit hooks for Python (black autoformatting, mypy type checking)
- [ ] Have Python backend pull from database that is available in AWS free tier, possibly using an ORM like SQLAlchemy
- [ ] Use terraform to do some of the AWS setup described above
