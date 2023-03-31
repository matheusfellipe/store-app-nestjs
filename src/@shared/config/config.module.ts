import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions,
} from '@nestjs/config';
import * as Joi from 'joi';
export type ConfigSchema = {
  DATABASE_URL: string;
  ADMIN_PASSWORD: string;
  JWT_SECRET: string;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
  JWT_EXPIRES_IN: string;
};

const configSchema: Joi.StrictSchemaMap<ConfigSchema> = {
  DATABASE_URL: Joi.string().required(),
  ADMIN_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_AUDIENCE: Joi.string().required(),
  JWT_ISSUER: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
};

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return super.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ...configSchema,
      }),
      ...options,
    });
  }
}
