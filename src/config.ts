type Config = {
  token: string
  guilds: string[]
  db_url: string
  app_id: string
  req_url: string
  api_key: string
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config: Config = require('../config.json')
