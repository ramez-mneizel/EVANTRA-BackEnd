import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Event from './models/Event.js';
import User from './models/user.js';

dotenv.config();

const seedAdminAndEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully...');


    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.findOneAndUpdate(
      { email: 'admin@eventify.com' },
      {
        name: 'System Admin',
        email: 'admin@eventify.com',
        password: hashedPassword,
        role: 'admin'
      },
      { upsert: true, new: true }
    );

    console.log('Admin account created/updated: admin@eventify.com');

    
    const initialEvents = [
      {
        title: 'Web Development Bootcamp 2026',
        description: 'Learn full-stack web development using Node.js and React.',
        category: 'Technology',
        location: 'Amman, Jordan',
        date: new Date('2026-11-15'),
        capacity: 50,
        createdBy: adminUser._id
      },
      {
        title: 'C++ & Logic Building Workshop',
        description: 'Master core programming concepts, OOP, and algorithms.',
        category: 'Education',
        location: 'Irbid, Jordan',
        date: new Date('2026-12-01'),
        capacity: 30,
        createdBy: adminUser._id
      }
    ];

    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(initialEvents);
      console.log('Initial events added successfully!');
    } else {
      console.log('Events already exist in the database.');
    }

    process.exit();
  } catch (error) {
    console.error('Error seeding admin data:', error);
    process.exit(1);
  }
};

seedAdminAndEvents();