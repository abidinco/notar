import { UsersModel } from '../Postgres/modelUsers';

export default resolvers = {

Query: {
	searchUser(_, args){
		return UsersModel.findAll({where: args});
		},
	}
};
