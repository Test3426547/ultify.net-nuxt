declare module 'nuxt-storage/server' {
    export function useStorage(): {
      getItem(key: string): Promise<string | null>;
      setItem(key: string, value: string): Promise<void>;
      removeItem(key: string): Promise<void>;
    }
  }
  
  declare module 'nuxt-storage/client' {
    export function useStorage(): {
      getItem(key: string): string | null;
      setItem(key: string, value: string): void;
      removeItem(key: string): void;
    }
  }