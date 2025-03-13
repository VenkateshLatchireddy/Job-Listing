const { body } = require('express-validator');

const userValidation = [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];





const jobValidation = [
  body('companyName').not().isEmpty().withMessage('Company name is required'),
  body('companyLogo').optional().isString().withMessage('Company logo must be a string'),
  body('jobPosition').not().isEmpty().withMessage('Job position is required'),
  body('monthlySalary').isNumeric().withMessage('Salary must be a number'),
  body('jobType').isIn(['Internship', 'Full-Time', 'Part-Time', 'Contractual']).withMessage('Invalid job type'),
  body('remote_office').isIn(['remote', 'office']).withMessage('Invalid remote/office value'),
  body('location').not().isEmpty().withMessage('Location is required'),
  body('jobDescription').not().isEmpty().withMessage('Job description is required'),
  body('aboutCompany').not().isEmpty().withMessage('About company is required'),
  body('skillsRequired')
    .custom((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return typeof value === 'string' && value.trim().length > 0;
    })
    .withMessage('Skills are required'),
  body('additionalInfo').optional().isString().withMessage('Additional info must be a string'),
  body('hiringCount')
    .isIn(['1-5', '6-10', '11-20', '21-50', '51-100', '100+'])
    .withMessage('Invalid hiring count'),
];




module.exports = {
  userValidation,
  jobValidation,
};
