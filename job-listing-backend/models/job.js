const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
    type: DataTypes.TEXT, // Updated length for companyLogo
    allowNull: true,  // Can be optional
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
    type: DataTypes.STRING,  // You can convert an array to a comma-separated string before storing
    allowNull: false,
  },
  additionalInfo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, { timestamps: true });

module.exports = Job;
