'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Bookmark.belongsTo(models.User, { foreignKey: 'userId' });
      Bookmark.belongsTo(models.Job, { foreignKey: 'jobId' });
    }
  }

  Bookmark.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',  // Ensure this matches the actual table name
          key: 'id',  // Assuming 'id' is the primary key of the 'users' table
        },
        allowNull: false,
      },
      jobId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'jobs',  // Ensure this matches the actual table name
          key: 'id',  // Assuming 'id' is the primary key of the 'jobs' table
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Bookmark',
      tableName: 'bookmarks',  // Explicitly set the table name to lowercase
      timestamps: true,  // Enable timestamps (if you want to track createdAt/updatedAt)
    }
  );

  return Bookmark;
};
