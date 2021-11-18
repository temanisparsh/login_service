module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			phone_number: {
				type: Sequelize.String,
				primaryKey: true,
			},
			otp: {
				type: Sequelize.STRING,
			},
			updatedAt: Sequelize.DATE,
			createdAt: Sequelize.DATE
		});
	},
	down: async queryInterface => {
		await queryInterface.dropTable('Users');
	},
};