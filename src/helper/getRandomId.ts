import { v4 as uuidv4 } from "uuid";

/**
 * Generate a unique ID with a given prefix.
 * @param prefix - The prefix to prepend (e.g., "client", "seller", "prod")
 * @returns A string like "client-9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d"
 */
export function generateUniqueId(prefix: string): string {
  // Generate a UUID (universally unique identifier)
  const uuid = uuidv4(); // remove hyphens for a cleaner ID
  return `${prefix}-${uuid}`;
}
