import { config } from "dotenv";


if (process.env.ENVIROMENT) {
  config({
    path: `.env.${process.env.ENVIROMENT.toLowerCase()}`,
    override: true,
  });
} else {
  config({
    path: ".env",
    override: true,
  });
}

interface EnvironmentData {
  url: string;
  credentials: { username: string; password: string };
}

function getEnvironmentData(): EnvironmentData {
  const url = process.env.URL;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!url || !username || !password) {
    throw new Error("Missing required environment variables: URL, USERNAME, PASSWORD");
  }

  return {
    url,
    credentials: {
      username,
      password,
    },
  };
}

export const environment = getEnvironmentData();
