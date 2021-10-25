# sim-slate-types

Common typings & helper functions for all slate related Simplicity projects.

## Releasing a new version

To release a new version:
1. Before pushing, update the package's version in `package.json`.
2. Push your updates to `master`.
3. Go to GitHub & open the "Releases" section.
4. Click "Draft a new release".
5. Create a new tag identical to the new version you've updated in `package.json`.
6. Add a release title (in our case, the version).
7. Press "publish"

After following these steps, the package should auto-deploy to our private NPM registry in our GH institution.

## Using the package

### Locally
To use the package locally (and any other package from our private NPM registry on GitHub), you will need a Personal Access Token (PAT):
1. Go to GitHub & generate a PAT [here](https://github.com/settings/tokens).
   1. I'd recommend setting the access rights only to `read:packages`, as that would be the only one necessary to access the package.
2. Create/edit the `.npmrc` file:
    ```
    //npm.pkg.github.com/:_authToken=<YOUR_TOKEN_GOES_HERE>
    @simplicity-tech:registry=https://npm.pkg.github.com
    ```
   1. The `.npmrc` file should be in the project's `.gitignore`.

3. Add the dependency to your project's `package.json`'s `dependencies`, e.g.:
    ```
          "@simplicity-tech/sim-slate-types": "1.1.0",
    ```
4. `yarn` to install the dependency.

