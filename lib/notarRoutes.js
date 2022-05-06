import { Meteor } from 'meteor/meteor';
import ApolloClient from 'apollo-client';
import {meteorClientConfig} from 'meteor/apollo';

import React from 'react';
import {mount, withOptions} from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NotarLayoutContainer from '/imports/ui/layouts/NotarLayout.jsx';
import NotarHomepage from '/imports/ui/containers/NotarHomepage.jsx';
import NotarSubmitpageContainer from '/imports/ui/containers/NotarSubmitpage.jsx';
import NotarDocumentsPage from '/imports/ui/containers/NotarDocumentsPage';
import NotarDocumentPageGeneral from '/imports/ui/containers/NotarDocumentPageGeneral';
import NotarDocumentPageComments from '/imports/ui/containers/NotarDocumentPageComments';
import NotarDocumentPageQuestions from '/imports/ui/containers/NotarDocumentPageQuestions';

const client = new ApolloClient(meteorClientConfig());

const notarRoutes = FlowRouter.group({prefix: '/notar', name: 'notar'});
const mounter = withOptions({
	rootId: '0n3r00t',
	rootProps: {
		'className': 'fullbleed'
	}
}, mount);

notarRoutes.route('/', {
	name: 'notarHomeRoute',
	action: function() {
		mounter(NotarLayoutContainer, {client: client, content: <NotarHomepage/>});
	}
});

notarRoutes.route('/yukle', {
	name: 'notarSubmitRoute',
	action: function() {
		mounter(NotarLayoutContainer, {client: client, content: <NotarSubmitpageContainer/>});
	}
});

notarRoutes.route('/notlar', {
	name: 'notarDocumentsRoute',
	action: function() {
		mounter(NotarLayoutContainer, {client: client, content: <NotarDocumentsPage />});
	}
});

notarRoutes.route('/not/:_docId', {
	name: 'notarDocumentRoute',
	action: function(params, queryParams) {
		if(queryParams.t == 'genel') {
			mounter(NotarLayoutContainer, {client: client, content: <NotarDocumentPageGeneral />});
		} else if(queryParams.t == 'sorular') {
			mounter(NotarLayoutContainer, {client: client, content: <NotarDocumentPageQuestions />});
		} else if(queryParams.t == 'yorumlar') {
			mounter(NotarLayoutContainer, {client: client, content: <NotarDocumentPageComments />});
		}
	}
});
