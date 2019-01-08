import React from 'react';
import renderer from 'react-test-renderer';
import { withGtag, getGtagContext } from './index';

const GTM_ID = 'GTM-123456';

describe('withGtag tests', () => {

    it('withGtag should include gtag (GtagContext) prop', () => {

        const w = {};
        const context = getGtagContext(w, GTM_ID);

        //create our component
        let componentProps = null;
        const GtaggedComponent = withGtag(class extends React.Component {

            constructor(props) {
                super(props);
                componentProps = props;
            }

            render() {
                return (<h1>hi</h1>);
            }
        });
        renderer.create(<GtaggedComponent />);

        expect(componentProps.gtag).toBe(context);
    });
});
