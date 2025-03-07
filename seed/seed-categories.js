require('dotenv').config();
const mongoose = require('mongoose');
const faker = require('@faker-js/faker').faker;
const Category = require('../models/category');
const connectToDB = require('../utils/database'); 

const seedCategories = async () => {
    try {
        await connectToDB(); 

        const categories = new Set();
        while (categories.size < 20) {
            const name = faker.commerce.department();
            const slug = faker.helpers.slugify(name).toLowerCase();
            categories.add(slug);
        }

        const categoryArray = Array.from(categories).map(slug => ({
            slug,
            translations: [{
                language: "en",
                name: slug.replace(/-/g, ' '),
                description: faker.lorem.sentence(),
            }]
        }));

        for (const category of categoryArray) {
            const existingCategory = await Category.findOne({ slug: category.slug });
            if (!existingCategory) {
                await Category.create(category);
            }
        }

        console.log('Unique fake categories inserted successfully');
    } catch (error) {
        console.error('Error inserting fake categories:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedCategories();
