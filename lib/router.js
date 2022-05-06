import { Meteor } from 'meteor/meteor';
import ApolloClient from 'apollo-client';
import {meteorClientConfig} from 'meteor/apollo';

import React from 'react';
import {mount, withOptions} from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';

import OneLayoutContainer from '/imports/ui/layouts/OneLayout.jsx';
import OneSignPage from '/imports/ui/containers/OneSignPage.jsx';
import OneAppsPage from '/imports/ui/containers/OneAppsPage.jsx';
import OneProfilePage from '/imports/ui/containers/OneProfilePage.jsx';
import OneRecoverPage from '/imports/ui/containers/OneRecoverPage.jsx';
import OneMessagesPage from '/imports/ui/containers/OneMessagesPage.jsx';
import OneProfileSettingsPage from '/imports/ui/containers/OneProfileSettingsPage.jsx';

import {Bert} from 'meteor/themeteorchef:bert';

import './notarRoutes.js';
import './kandexRoutes.js';

injectTapEventPlugin();

const client = new ApolloClient(meteorClientConfig());

const mounter = withOptions({
	rootId: '0n3r00t',
	rootProps: {
		'className': 'fullbleed'
	}
}, mount);

FlowRouter.route('/', {
	action: function() {
		FlowRouter.go('/apps');
	}
});

FlowRouter.route('/apps', {
	action: function() {
		mounter(OneLayoutContainer, {client: client, content: <OneAppsPage />});
	}
});

const profileRoutes = FlowRouter.group({prefix: '/profil', name: 'profileRoutes'});

profileRoutes.route('/ayarlar', {
	name: 'profileSettingsRoute',
	action: function() {
		mounter(OneLayoutContainer, {client: client, content: <OneProfileSettingsPage />});
	}
});

profileRoutes.route('/:_username', {
	name: 'profileRoute',
	action: function() {
		mounter(OneLayoutContainer, {client: client, content: <OneProfilePage />});
	}
});

FlowRouter.route('/mesaj/:_username', {
	name: 'messagesRoute',
	action: function() {
		mounter(OneLayoutContainer, {client: client, content: <OneMessagesPage />});
	}
})
/*
FlowRouter.route('/oturum', {
	action: function() {
		mounter(OneLayout, {client: client, loggedIn: false, content: <OneSignPage/>});
	}
});
*/
FlowRouter.route('/oturum/unuttum', {
	action: function() {
		mounter(OneLayoutContainer, {client: client, content: <OneRecoverPage/>});
	}
});

FlowRouter.route('/verify-email/:token', {
	action(params) {
		Accounts.verifyEmail(params.token, (err) => {
			if(err) {
				Bert.alert(err.reason, 'growl-top-right', 'danger');
			} else {
				FlowRouter.go('/');
				Bert.alert('Emailinizi doğruladınız', 'growl-top-right', 'success');
			}
		});
	}
});

FlowRouter.notFound = {
	action: function() {
		console.log(404);
	}
};
