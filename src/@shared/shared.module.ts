/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import {
  DateHandlingProvider,
  EncryptProvider,
  GenerateHashCodeProvider,
  GenerateIdProvider,
} from './providers';

@Global()
@Module({
  providers: [
    EncryptProvider,
    GenerateHashCodeProvider,
    DateHandlingProvider,
    GenerateIdProvider,
  ],
  exports: [
    EncryptProvider,
    GenerateHashCodeProvider,
    DateHandlingProvider,
    GenerateIdProvider,
  ],
})
export class SharedModuke {}
