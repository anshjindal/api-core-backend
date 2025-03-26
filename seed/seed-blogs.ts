import dotenv from 'dotenv';
import mongoose, { Types } from 'mongoose';
import { faker } from '@faker-js/faker';
import Category from '../models/category';
import Blogs from '../models/blog';
import connectToDB from '../utils/database';

dotenv.config();


export interface BlogInput {
  slug: string;
  timeToRead: number;
  imageUrl: string;
  cloudinaryPubicUrl: string;
  cloudinaryAssetId: string;
  tags: string[];
  translations: {
    language: string;
    title: string;
    markdownContent: string;
    author: string;
    shortDesc: string;
  }[];
  categories: Types.ObjectId[];
}

// Generate random blog data
const generateBlogs = async (count: number) => {
  const blogs: BlogInput[] = [];
  const categories = await Category.find();

  if (categories.length === 0) {
    throw new Error("No categories found. Please seed categories first.");
  }

  for (let i = 0; i < count; i++) {
    const categoryCount = faker.number.int({ min: 1, max: 4 });
    const selectedCategories: mongoose.Types.ObjectId[] = [];

    const availableIndices = [...Array(categories.length).keys()];

    for (let j = 0; j < categoryCount && availableIndices.length > 0; j++) {
      const randomIndex = faker.number.int({
        min: 0,
        max: availableIndices.length - 1,
      });
      const categoryIndex = availableIndices[randomIndex];
      availableIndices.splice(randomIndex, 1);
      selectedCategories.push(categories[categoryIndex]._id);
    }

    const blog: BlogInput = {
      slug: `${faker.lorem.slug()}-${faker.string.uuid()}`,
      timeToRead: faker.number.int({ min: 2, max: 60 }),
      imageUrl: faker.image.url(),
      cloudinaryPubicUrl: faker.image.url(),
      cloudinaryAssetId: faker.string.uuid(),
      tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
        faker.lorem.word()
      ),
      translations: [
        {
          language: 'en',
          title: faker.lorem.sentence({ min: 8, max: 15 }),
          markdownContent: faker.lorem.paragraphs({ min: 4, max: 9 }),
          author: faker.person.fullName(),
          shortDesc: faker.lorem.sentence({ min: 15, max: 40 }),
        },
        {
          language: 'fr',
          title: faker.lorem.sentence({ min: 8, max: 15 }),
          markdownContent: faker.lorem.paragraphs({ min: 4, max: 9 }),
          author: faker.person.fullName(),
          shortDesc: faker.lorem.sentence({ min: 15, max: 40 }),
        },
      ],
      categories: selectedCategories,
    };

    blogs.push(blog);
  }

  return blogs;
};

// Insert blogs into the database
const seedBlogs = async () => {
  try {
    await connectToDB(process.env.MONGODB_NAME as string);

    const count = 200;
    const blogs = await generateBlogs(count);

    await Blogs.insertMany(blogs);
    console.log(`${count} blogs have been successfully added to the database.`);

    await mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error seeding blogs:", error);
    process.exit(1);
  }
};

seedBlogs();
