const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user"); // Import User model

const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyLogo: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  jobPosition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monthlySalary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jobType: {
    type: DataTypes.ENUM('Internship', 'Full-Time', 'Part-Time', 'Contractual'),
    allowNull: false,
  },
  remote_office: {
    type: DataTypes.ENUM('remote', 'office'),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hiringCount: {
    type: DataTypes.ENUM("1-5", "6-10", "11-20", "21-50", "51-100", "100+"),
    allowNull: false,
  },
  jobDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  aboutCompany: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  skillsRequired: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  additionalInfo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {  // ✅ Add userId field
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, // ✅ Ensure foreign key reference
      key: "id",
    },
    onDelete: "CASCADE", // ✅ Ensure cascading delete
  }
}, { timestamps: true });

// ✅ Associate Job with User
Job.belongsTo(User, { foreignKey: "userId" });

module.exports = Job;
