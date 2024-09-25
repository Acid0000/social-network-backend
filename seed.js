const mongoose = require('mongoose');
const { User, Thought } = require('./models');
const db = require('./config/connection');

const userData = [
  {
    username: 'alice123',
    email: 'alice123@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'bob_the_builder',
    email: 'bob@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'charlie_parkour',
    email: 'charliep@example.com',
    thoughts: [],
    friends: [],
  }
];

const thoughtData = [
  {
    thoughtText: "Here's a cool thought from Alice...",
    username: 'alice123',
    reactions: [
      {
        reactionBody: 'I totally agree!',
        username: 'bob_the_builder',
      },
      {
        reactionBody: 'Great thought!',
        username: 'charlie_parkour',
      },
    ],
  },
  {
    thoughtText: 'I love coding!',
    username: 'bob_the_builder',
    reactions: [
      {
        reactionBody: 'Same here!',
        username: 'alice123',
      },
    ],
  },
  {
    thoughtText: 'Outdoor adventures are the best.',
    username: 'charlie_parkour',
    reactions: [
      {
        reactionBody: 'Absolutely!',
        username: 'bob_the_builder',
      },
    ],
  }
];

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany(userData);
    console.log('Users inserted:', users);

    for (const thought of thoughtData) {
      const newThought = await Thought.create(thought);

      await User.findOneAndUpdate(
        { username: newThought.username },
        { $push: { thoughts: newThought._id } }
      );
    }

    await User.findOneAndUpdate(
      { username: 'alice123' },
      { $push: { friends: users[1]._id } }
    );

    await User.findOneAndUpdate(
      { username: 'bob_the_builder' },
      { $push: { friends: users[0]._id } }
    );

    console.log('Thoughts and reactions inserted.');
    console.log('Friends relationships created.');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

db.once('open', seedDatabase);
