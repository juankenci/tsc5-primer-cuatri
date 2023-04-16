const Sequelize = require("sequelize");
const errors = require("../errors");
const logger = require("../logger");

const defaultErrorMessage = (err) => {
  if (err instanceof Sequelize.ForeignKeyConstraintError) {
    return "Foreign Key Error";
  }
  if (err instanceof Sequelize.UniqueConstraintError) {
    return "Unique constraint violation";
  }
  return "Undefined error";
};

// eslint-disable-next-line no-empty-function
exports.notifyErrorDatabase = (e, additionalMessages = () => {}) => {
  console.log("ERROR DB:", e);
  if (
    e instanceof Sequelize.ForeignKeyConstraintError ||
    e instanceof Sequelize.UniqueConstraintError
  ) {
    const message = additionalMessages(e);
    //return Promise.reject(errors.badRequest(message || defaultErrorMessage(e)));
    return Promise.reject(
      errors.defaultError(message || defaultErrorMessage(e))
    );
  }

  logger.error("Database error", e);
  return Promise.reject(errors.defaultError("Database error"));
};
