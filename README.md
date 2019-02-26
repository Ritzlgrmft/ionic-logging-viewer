# ionic-logging-viewer workspace

[![Build](https://travis-ci.org/Ritzlgrmft/ionic-logging-viewer.svg?branch=master)](https://travis-ci.org/Ritzlgrmft/ionic-logging-viewer)
[![Codecov](https://codecov.io/gh/Ritzlgrmft/ionic-logging-viewer/branch/master/graph/badge.svg)](https://codecov.io/gh/Ritzlgrmft/ionic-logging-viewer)
[![Version](https://badge.fury.io/js/ionic-logging-viewer.svg)](https://www.npmjs.com/package/ionic-logging-viewer)
[![Downloads](https://img.shields.io/npm/dt/ionic-logging-viewer.svg)](https://www.npmjs.com/package/ionic-logging-viewer)
[![Dependencies](https://david-dm.org/ritzlgrmft/ionic-logging-viewer/master/status.svg)](https://david-dm.org/ritzlgrmft/ionic-logging-viewer/master)
[![Peer-Dependencies](https://david-dm.org/ritzlgrmft/ionic-logging-viewer/master/peer-status.svg)](https://david-dm.org/ritzlgrmft/ionic-logging-viewer/master?type=peer)
[![Dev-Dependencies](https://david-dm.org/ritzlgrmft/ionic-logging-viewer/master/dev-status.svg)](https://david-dm.org/ritzlgrmft/ionic-logging-viewer/master?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/ritzlgrmft/ionic-logging-viewer/badge.svg)](https://snyk.io/test/github/ritzlgrmft/ionic-logging-viewer)
[![License](https://img.shields.io/npm/l/ionic-logging-viewer.svg)](https://www.npmjs.com/package/ionic-logging-viewer)

The logging viewer is a small component which can be used in your [Ionic app](http://ionicframework.com)
for displaying the current logs, written by [ionic-logging-service](https://github.com/Ritzlgrmft/ionic-logging-service).
The viewer is meant for development and testing purposes, not for production.

The workspace contains these projects:

## ionic-logging-viewer

The viewer component. For further info have a look at the [component's readme](https://github.com/Ritzlgrmft/ionic-logging-viewer/blob/master/projects/ionic-logging-viewer/README.md).

Useful commands:

* `npm run build`
* `npm test`
* `npm run compodoc`

## ionic-logging-viewer-app

A test app for the `ionic-logging-viewer` as well as a sample app for `ionic-logging-service`.

Useful commands:

* `ionic serve --project ionic-logging-viewer-app`

## ionic-logging-viewer-app-e2e

End-to-end tests of the `ionic-logging-viewer` component.

Useful commands:

* `npm run e2e`
