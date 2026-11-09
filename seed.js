const sequelize = require('./config/db');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Crop = require('./models/Crop');
const Buyer = require('./models/Buyer');
const Worker = require('./models/Worker');
require('./models/associations');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@agri.com',
      password: hashedPassword,
      role: 'admin'
    });
    const farmer = await User.create({
      name: 'Ahmed Farmer',
      email: 'ahmed@agri.com',
      password: hashedPassword,
      role: 'farmer'
    });
    await Crop.create({
      name: 'Wheat',
      type: 'Grain',
      variety: 'Punjab-11',
      season: 'Rabi',
      area: 10,
      status: 'growing',
      userId: farmer.id
    });
    await Crop.create({
      name: 'Cotton',
      type: 'Cash Crop',
      variety: 'BT Cotton',
      season: 'Kharif',
      area: 8,
      status: 'harvested',
      userId: farmer.id
    });
    await Buyer.create({
      name: 'Ali Buyer',
      phone: '03001234567',
      cnic: '3520212345671',
      city: 'Lahore',
      email: 'ali@buyer.com'
    });
    await Worker.create({
      fullName: 'Muhammad Worker',
      name: 'Muhammad Worker',
      phone: '03007654321',
      cnic: '3520298765431',
      dailyWage: 1500
    });
    console.log('Seed data inserted successfully!');
    console.log('Login: admin@agri.com / admin123');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}
seed();