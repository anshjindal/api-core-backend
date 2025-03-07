require('dotenv').config();
const mongoose = require('mongoose');
const faker = require('@faker-js/faker').faker;
const Category = require('../models/category');
const Blog = require('../models/blog');
const connectToDB = require('../utils/database'); 

const seedBlogs = async () => {
    try {
        await connectToDB(); 
        const categories = await Category.find();
        if (categories.length === 0) {
            console.error('No categories found. Run the category seeder first.');
            return;
        }

        const blogs = Array.from({ length: 100 }, () => {
            const randomCategories = [
                categories[Math.floor(Math.random() * categories.length)], // At least one category
            ];

            if (Math.random() > 0.5) {
                randomCategories.push(categories[Math.floor(Math.random() * categories.length)]);
            }

            return {
                slug: faker.helpers.slugify(faker.lorem.words(3)).toLowerCase(),
                imageUrl: faker.image.url(),
                cloudinaryAssetId: faker.string.uuid(),
                cloudinaryPubicUrl: faker.internet.url(),
                tags: [faker.word.noun(), faker.word.noun()],
                timeToRead: faker.number.int({ min: 2, max: 15 }),
                translations: [{
                    language: "en",
                    title: faker.lorem.sentence(),
                    shortDesc: faker.lorem.sentence(),
                    author: faker.person.fullName(),
                    markdownContent: faker.lorem.paragraphs(3),
                }],
                categories: randomCategories.map(cat => cat._id)
            };
        });

        await Blog.insertMany(blogs);
        console.log('100 fake blogs inserted successfully');
    } catch (error) {
        console.error('rror inserting fake blogs:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedBlogs();
