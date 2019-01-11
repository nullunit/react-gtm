import GtagContext from './GtagContext';
import GtagScript from './GtagScript';
import React from 'react';
import renderer from 'react-test-renderer';

const UA_ID = 'UA-123456';

describe('GtagScript tests', () => {

    it('Append Google Universal Analytics script to load Google Analytics', () => {

        const script = '<script type="text/javascript" src="/static/js/bundle.js"></script>';
        const expectedGtagScript = `<script src="https://www.googletagmanager.com/gtag/js?id=${UA_ID}"></script>${script}`;

        document.body.innerHTML =
            '<html>' +
            `  <body>${script}</body>` +
            '</html>';

        const context = new GtagContext(window, UA_ID);
        const props = {
            'id': UA_ID,
            context,
            'useTagManager': false
        };

        //test render snapshot
        const json = renderer
            .create(<GtagScript { ...props }><h1>mock child</h1></GtagScript>)
            .toJSON();

        expect(json).toMatchSnapshot();
        expect(expectedGtagScript).toEqual(document.body.innerHTML.trim());
    });

});
