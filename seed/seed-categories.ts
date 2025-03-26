import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Category from '../models/category';
import connectToDB from '../utils/database';

dotenv.config();

export interface CategoryTranslation {
  language: string;
  name: string;
  description: string;
}

export interface CategoryInput {
  slug: string;
  translations: CategoryTranslation[];
}


// Generate random category data
const generateCategories = (count: number): CategoryInput[] => {
  const categories: CategoryInput[] = [];

  for (let i = 0; i < count; i++) {
    const category: CategoryInput = {
      slug: faker.lorem.slug(),
      translations: [
        {
          language: 'en',
          name: faker.commerce.department(),
          description: faker.lorem.sentence(30),
        },
        {
          language: 'fr',
          name: faker.commerce.department(),
          description: faker.lorem.sentence(30),
        },
      ],
    };
    categories.push(category);
  }

  return categories;
};

// Insert categories into the database
const seedCategories = async () => {
  try {
    await connectToDB(process.env.MONGODB_NAME as string);

    const count = 10;
    const categories = generateCategories(count);

    await Category.insertMany(categories);
    console.log(`${count} categories have been successfully added to the database.`);

    await mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();
