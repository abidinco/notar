import Sequelize from 'sequelize';
import SECRET from '../secret';

const db = new Sequelize(SECRET.db.name, SECRET.db.admin, SECRET.db.password, {
	host: 'localhost',
	dialect: 'postgres'
});

db.sync(); // {force: true} cleans database when meteor server restarted

export {db};
