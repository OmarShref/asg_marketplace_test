import { v4 as uuidv4 } from "uuid";

export function generateUniqueId() {
  return "anonymous-" + uuidv4();
}