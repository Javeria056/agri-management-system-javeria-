const sequelize = require('./config/db');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Unable to connect:', err.message);
    process.exit(1);
  }
}
test();