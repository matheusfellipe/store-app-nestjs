import { Injectable, NestMiddleware } from '@nestjs/common';
import { runWithContext } from './context';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const correlationId = this.generateCorrelationId(8);
    runWithContext(
      {
        correlationId,
      },
      next,
    );
  }

  private generateCorrelationId(length: number) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let correlationId = '';
    for (let i = 0; i < length; i++) {
      correlationId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return correlationId;
  }
}
