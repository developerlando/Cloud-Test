declare module 'dotenv' {
    export function config(options?: { path?: string, encoding?: string }): void;
    export function load(options?: { path?: string, encoding?: string }): { [key: string]: string };
    export namespace load {
      export function parse(envString: string, options?: { path?: string, encoding?: string }): { [key: string]: string };
    }
  }

