import {db} from  './connector';
import Sequelize from 'sequelize';

const user = db.define('users', {
	username: {
		type: Sequelize.STRING
	}
}, {
	timestamps: false
});

const UsersModel = db.models.users;

export {UsersModel};
