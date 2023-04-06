import { AsyncLocalStorage } from 'async_hooks';

type Context = {
  correlationId: string;
};

const storage = new AsyncLocalStorage<Context>();

export function getContext(): Context | undefined {
  return storage.getStore();
}

export function runWithContext(ctx: Context, callback: () => unknown) {
  storage.run(ctx, callback);
}
