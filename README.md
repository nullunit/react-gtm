Google Tag Manager and Universal Analytics for React
==================================

[![NPM Current Version](https://img.shields.io/npm/v/@nullunit/react-gtm.svg)](https://www.npmjs.com/package/@nullunit/react-gtm)
[![License](https://img.shields.io/github/license/nullunit/react-gtm.svg)](https://github.com/nullunit/react-gtm/blob/master/LICENSE)
[![NPM Library Size](https://img.shields.io/bundlephobia/minzip/@nullunit/react-gtm.svg)](https://www.npmjs.com/package/@nullunit/react-gtm)

[![NPM Downloads](https://img.shields.io/npm/dependency-version/@nullunit/react-gtm/peer/react.svg)](https://www.npmjs.com/package/react)
[![NPM Downloads](https://img.shields.io/npm/dependency-version/@nullunit/react-gtm/peer/prop-types.svg)](https://www.npmjs.com/package/prop-types)

[![Build Status](https://api.travis-ci.org/nullunit/react-gtm.svg?branch=master)](https://travis-ci.org/nullunit/react-gtm)
[![Maintainability](https://api.codeclimate.com/v1/badges/c7b29e60c5bc073b5be0/maintainability)](https://codeclimate.com/github/nullunit/react-gtm/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c7b29e60c5bc073b5be0/test_coverage)](https://codeclimate.com/github/nullunit/react-gtm/test_coverage)
[![Issues](https://img.shields.io/codeclimate/issues/nullunit/react-gtm.svg)](https://codeclimate.com/github/nullunit/react-gtm/issues)
[![Technical Debt](https://img.shields.io/codeclimate/tech-debt/nullunit/react-gtm.svg)](https://codeclimate.com/github/nullunit/react-gtm/trends/technical_debt)

Thin wrapper and React component for including Google Tag Manager or Universal Analytics in a React project.

Usage with Google Tag Manager
---------------
For running with Google Tag Manager, wrap the root element in the `GtagProvider` setting the `id` with your Google Tag Manager id and setting `useTagManager` to `true`:

```
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { GtagProvider } from '@nullunit/react-gtm';

const GTM_ID = 'GTM-12345';
const MY_APP_NAME = 'My great app'; //Optional
const MY_APP_VERSION = '3.1.2'; //Optional
const ROOT = (
    <GtagProvider id={ GTM_ID } appName={ MY_APP_NAME } appVersion={ MY_APP_VERSION } useTagManager={ true }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GtagProvider>
);

Modal.setAppElement('#root');
ReactDOM.render(ROOT, document.getElementById('root'));
registerServiceWorker();
```

Now, you can either inject the `GtagContext` using `withGtag` (for React components) or get the context directly via `getGtagContext` singleton (for non-React items).

```
import { withGtag, getGtagContext } from '@nullunit/react-gtm';

...

//for React components
class MyComponent extends React.Component {

    componentDidMount() {

        const { gtag } = this.props;
        gtag.event('ProjectLoaded', { 'projectId': '...' });
    }

    render() {
        return `<h1>...</h1>`;
    }
}

export withGtag(MyComponent);

...

//from outside React context
const gtag = getGtagContext();
gtag.event('ProjectCreated', { 'projectId': '...' });

```

Usage with Universal Analytics
---------------
For running with Universal Analytics, wrap the root element in the `GtagProvider` setting the `id` with your Universal Analytics id and setting `useTagManager` to `false` (or leave `useTagManager` unset):

```
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { GtagProvider } from '@nullunit/react-gtm';

const UA_ID = 'UA-12345-1';
const MY_APP_NAME = 'My great app'; //Optional
const MY_APP_VERSION = '3.1.2'; //Optional
const ROOT = (
    <GtagProvider id={ UA_ID } appName={ MY_APP_NAME } appVersion={ MY_APP_VERSION }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GtagProvider>
);

Modal.setAppElement('#root');
ReactDOM.render(ROOT, document.getElementById('root'));
registerServiceWorker();
```

Now, you can get the context directly via `getGtagContext` singleton and call the `gtag` function.

```
import { getGtagContext } from '@nullunit/react-gtm';

...

//for React components
class MyComponent extends React.Component {

    componentDidMount() {

        const { gtag } = this.props;
        gtag.gtag('event', 'Project Created', {
            'event_category': 'Project Events',
            'event_label': 'project12345',
            'value': 0
        });
    }

    render() {
        return `<h1>...</h1>`;
    }
}

export withGtag(MyComponent);

...

//from outside React context
const gtag = getGtagContext();
gtag.gtag('event', 'Project Created', {
    'event_category': 'Project Events',
    'event_label': 'project12345',
    'value': 0
});

```
