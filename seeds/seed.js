const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    const index = Math.floor(Math.random() * users.length)

    await Post.create({
      ...post,
      user_id: users[index].id,
      username: users[index].username
    });
    
      
   
  }
  const posts= await Post.findAll()
  for (const comment of commentData) {
    const index = Math.floor(Math.random() * posts.length)

    await Comment.create({
      ...comment,
      user_id: users[index].id,
      post_id: posts[index].id,
      username: users[index].username
    });
    
      
   
  }
  process.exit(0);
};

seedDatabase();
