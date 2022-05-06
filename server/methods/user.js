import {UsersModel} from '/imports/api/Postgres/modelUsers';

if(Meteor.isServer){
	Meteor.methods({
		'user.register'(username) {
			UsersModel.create({username: username});
		},
		'user.uploadPP'(imageFile) {
		}
	})
}
