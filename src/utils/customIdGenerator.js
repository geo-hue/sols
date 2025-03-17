import FarewellCover from "../models/FarewellCover.js";

// Generate a random ID with a given prefix
export function generateRandomId(prefix) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniquePart = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniquePart += characters[randomIndex];
  }

  return `${prefix}${uniquePart}`;
}

// Check if the generated ID already exists in the database
export async function generateUniqueCustomId(prefix) {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    uniqueId = generateRandomId(prefix);
    try {
      const existingDocument = await FarewellCover.findOne({ _id: uniqueId });
      if (!existingDocument) {
        isUnique = true;
      }
    } catch (error) {
      console.error('Error checking existing ID:', error);  // Log any errors
      throw error;  // Re-throw after logging
    }
  }

  return uniqueId;
}
