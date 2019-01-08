import React from 'react';
import renderer from 'react-test-renderer';
import GtagProvider from './GtagProvider';
jest.mock('./GtagManagerScript');
jest.mock('./GtagScript');

const GTM_ID = 'GTM-123456';

describe('GtagProvider tests', () => {

    it('Create GtagProvider for Google Analytics', () => {

        const props = {
            id: GTM_ID,
            useTagManager: false
        };

        //test render snapshot
        const json = renderer
            .create(<GtagProvider { ...props }><h1>mock child</h1></GtagProvider>)
            .toJSON();

        expect(json).toMatchSnapshot();
    });

    it('Create GtagProvider for Google Tag Manager', () => {

        const props = {
            id: GTM_ID,
            useTagManager: true
        };

        //test render snapshot
        const json = renderer
            .create(<GtagProvider { ...props }><h1>mock child</h1></GtagProvider>)
            .toJSON();

        expect(json).toMatchSnapshot();
    });
});
