Google Tag Manager and Universal Analytics for React
==================================

[![Build Status](https://api.travis-ci.org/nullunit/react-gtm.svg?branch=master)](https://travis-ci.org/nullunit/react-gtm)
[![Maintainability](https://api.codeclimate.com/v1/badges/c7b29e60c5bc073b5be0/maintainability)](https://codeclimate.com/github/nullunit/react-gtm/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c7b29e60c5bc073b5be0/test_coverage)](https://codeclimate.com/github/nullunit/react-gtm/test_coverage)

Thin wrapper and React component for including Google Tag Manager or Universal Analytics in a React project.

Usage
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
    import { withGtag, getGtagContext } from './index';

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
