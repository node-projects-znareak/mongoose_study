const chalk = require("chalk");

module.exports = class Messages {
  static error(message) {
    console.error(chalk.redBright(message));
  }
  static success(message) {
    console.log(chalk.greenBright(message));
  }
  static warning(message) {
    console.warn(chalk.yellowBright(message));
  }
  static info(message) {
    console.info(chalk.blueBright(message));
  }
};
