import { Meteor } from 'meteor/meteor';
import ApolloClient from 'apollo-client';
import {meteorClientConfig} from 'meteor/apollo';

import React from 'react';
import {mount, withOptions} from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';
import KandexLayoutContainer from '/imports/ui/layouts/KandexLayout.jsx';
import KandexHomepage from '/imports/ui/containers/KandexHomepage.jsx';

const client = new ApolloClient(meteorClientConfig());

const kandexRoutes = FlowRouter.group({prefix: '/kandex', name: 'kandex'});
const mounter = withOptions({
    rootId: '0n3r00t',
    rootProps: {
        'className': 'fullbleed'
    }
}, mount);

kandexRoutes.route('/', {
    action: function() {
        mounter(KandexLayoutContainer, {client: client, content: <KandexHomepage/>});
    }
});
