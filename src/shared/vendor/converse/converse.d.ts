declare const converse: {
  load: () => Promise<void>;
  plugins: {
    add: (name: string, plugin: any) => void;
    shutdown: (name: string, plugin: any) => void;
  };
  initialize: (config: Record<string, any>) => void;
};

