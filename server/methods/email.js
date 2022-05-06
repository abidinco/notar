import {Email} from 'meteor/email';

if(Meteor.isServer) {
	Meteor.methods({
		'email.verification'() {
			let userId = Meteor.userId();
			if(userId) {
				return Accounts.sendVerificationEmail(userId)
			}
		}
	})
}
