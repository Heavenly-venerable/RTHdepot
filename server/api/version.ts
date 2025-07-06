import getClient from "../db/client";

export default defineCachedEventHandler(
  async (event) => {
    const db = getClient()
    const result = db`SELECT version()`
    return result
  },
  {
    maxAge: 60 * 60 * 24,
  }
);
