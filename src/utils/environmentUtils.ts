import {config} from "dotenv";
import { testConfig } from '../../config/testConfig';

export function loadEnvironmentConfig(): void { 
  if (process.env.ENVIROMENT) {
    config({
      path: `environment/.env.${process.env.ENVIROMENT}`,
      override: true,
    });
  } else {
    config({
      path: "environment/.env",
      override: true,
    });
  }
}

export interface EnvironmentSettings {
    HEADLESS_MODE: boolean;
  }
  
  export function getEnvironmentSettings(): EnvironmentSettings {
    return {
      HEADLESS_MODE: process.env.HEADLESS?.toLowerCase() === testConfig.defaultHeadless
    };
  }
  
