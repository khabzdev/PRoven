import { customAlphabet } from "nanoid";

// Define the alphabet to include uppercase letters, lowercase letters, digits, and special characters, must be in parts separated by -
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

export const nanoid = customAlphabet(alphabet, 21);
