import { neon } from "@neondatabase/serverless"

const getClient = () => {
  const { databaseUrl } = useRuntimeConfig()
  return neon(databaseUrl)
}

export default getClient
