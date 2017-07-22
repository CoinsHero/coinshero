# coinshero

## Setup

### Node.js
#### NVM
Install ```nvm``` using the instructions [here](https://github.com/creationix/nvm#install-script).

Then, install the node version used by this repository:
```shell
nvm install
```

This will install and automatically use the node version specific in the `.nvmrc` file. 

In order to activate NVM for all the terminal windows you'll open in the future you'll need to add to the ```~/.bash_profile``` file the following section:
```shell
# NVM
# Start nvm in the new session
export NVM_DIR="/Users/<the macOS user>/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```

Now every change that you'll do will auto build the package and then webpack-dev-server will catch the changes and update website according to them.

#### NPM

Run WITHOUT `sudo`:
```shell
npm i
```

#### hosts
Set your hosts file (`/etc/hosts` on UNIX systems) to have:
```
127.0.0.1   local-coinshero.io
```

## Run

#### ntl
We recommend installing [ntl](https://www.npmjs.com/package/ntl) for running `npm` scripts:
```shell
npm i -g ntl
```

Run:
```shell
npm start
```

This will start the webpack-dev-server

## Upload to S3

* Get the `hiddenS3Data.json` file from a team member and place it in the `scripts` folder.
* Install the `awscli` (on macOS we recommend using `brew install awscli`. Install [brew](https://brew.sh/) if needed).
* `npm run aws:upload:production`
