function UserModel(sequelize, DataTypes) {
	const User = sequelize.define(
		'User',
		{
			phone_number: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			otp: {
				type: DataTypes.STRING,
			},
		}
	);
	return User;
}

module.exports = UserModel;