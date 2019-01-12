import GtagManagerScript from './GtagManagerScript';
import React from 'react';
import renderer from 'react-test-renderer';

const GTM_ID = 'GTM-123456';

describe('GtagManagerScript tests', () => {

    it('Append Google Tag Manager script to load Google Analytics', () => {

        const script = '<script type="text/javascript" src="/static/js/bundle.js"></script>';
        const expectedGtagScript = `<script src="https://www.googletagmanager.com/gtm.js?id=${GTM_ID}"></script>${script}`;

        document.body.innerHTML =
            '<html>' +
            `  <body>${script}</body>` +
            '</html>';

        const props = {
            'id': GTM_ID,
            'useTagManager': true
        };

        //test render snapshot
        const json = renderer
            .create(<GtagManagerScript { ...props }><h1>mock child</h1></GtagManagerScript>)
            .toJSON();

        expect(json).toMatchSnapshot();
        expect(expectedGtagScript).toEqual(document.body.innerHTML.trim());
    });

});
