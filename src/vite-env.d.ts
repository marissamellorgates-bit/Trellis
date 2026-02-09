/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'ical.js' {
  namespace ICAL {
    interface Time {
      hour: number;
      minute: number;
      second: number;
      isDate: boolean;
      toJSDate(): Date;
    }

    class Component {
      constructor(data: unknown[]);
      getAllSubcomponents(name: string): Component[];
    }

    class Event {
      constructor(component: Component);
      uid: string;
      summary: string;
      description: string;
      startDate: Time;
      endDate: Time;
    }

    function parse(input: string): unknown[];
  }

  export = ICAL;
}

declare namespace google.accounts.oauth2 {
  interface TokenClient {
    requestAccessToken(): void;
  }

  interface TokenResponse {
    access_token: string;
    error?: string;
  }

  interface TokenClientConfig {
    client_id: string;
    scope: string;
    callback: (response: TokenResponse) => void;
  }

  function initTokenClient(config: TokenClientConfig): TokenClient;
}
