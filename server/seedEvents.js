const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');
const User = require('./models/User');

dotenv.config();

const sampleEvents = [
    {
        title: 'Full Stack Development Masterclass',
        description: 'Join us for an intensive deep dive into the MERN stack. Learn how to build scalable web applications from scratch.',
        date: new Date(Date.now() + 86400000 * 3), // 3 days from now
        type: 'Workshop',
        link: 'https://zoom.us/j/123456789',
    },
    {
        title: 'UI/UX Design Trends 2025',
        description: 'Explore the latest trends in user interface and experience design. Perfect for beginners and experienced designers alike.',
        date: new Date(Date.now() + 86400000 * 7), // 7 days from now
        type: 'Webinar',
        link: 'https://meet.google.com/abc-defg-hij',
    },
    {
        title: 'Python for Data Science Bootcamp',
        description: 'A hands-on session covering Pandas, NumPy, and Matplotlib. Bring your laptop and get ready to code!',
        date: new Date(Date.now() + 86400000 * 14), // 14 days from now
        type: 'Workshop',
        link: 'https://zoom.us/j/987654321',
    },
    {
        title: 'Tech Career Networking Night',
        description: 'Connect with industry professionals and fellow learners. Great opportunity to find mentors and job openings.',
        date: new Date(Date.now() + 86400000 * 20), // 20 days from now
        type: 'Meetup',
        link: 'https://meet.google.com/xyz-uvw-pqr',
    }
];

const seedEvents = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Find a user to be the organizer (just pick the first one)
        const organizer = await User.findOne();
        if (!organizer) {
            console.log('No users found. Please create a user first.');
            process.exit(1);
        }

        // Add organizer to events
        const eventsWithOrganizer = sampleEvents.map(event => ({
            ...event,
            organizer: organizer._id
        }));

        await Event.deleteMany({}); // Clear existing events
        await Event.insertMany(eventsWithOrganizer);

        console.log('Events Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedEvents();
