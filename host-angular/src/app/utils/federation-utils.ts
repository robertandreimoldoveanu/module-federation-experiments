type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

const moduleMap: Record<string, boolean> = {};

function loadRemoteEntry(remoteEntry: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (moduleMap[remoteEntry]) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = remoteEntry;

    script.onerror = reject;

    script.onload = () => {
      moduleMap[remoteEntry] = true;
      resolve(); // window is the global namespace
    };

    document.body.append(script);
  });
}

async function lookupExposedModule<T>(remoteName: string, exposedModule: string): Promise<T> {
  await __webpack_init_sharing__('default');
  const container = (window as any)[remoteName] as Container;
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}

async function lookupExposedESModule<T>(remoteEntry: string, exposedModule: string): Promise<T> {
  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  // const container = (window as any)[remoteName] as Container; // or get the container somewhere else
  // remoteEntry = 'http://localhost:4201/remoteEntry.js';
  const container = await import('http://localhost:5173/assets/remoteEntry.js').then((m) => {
    return m;
  }) as Container;
  await __webpack_init_sharing__('default');

  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}

export type LoadRemoteModuleOptions = {
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
};

export async function loadRemoteModule(options: LoadRemoteModuleOptions): Promise<any> {
  await loadRemoteEntry(options.remoteEntry);
  return await lookupExposedModule<any>(options.remoteName, options.exposedModule);
}

export async function loadRemoteESModule(options: LoadRemoteModuleOptions): Promise<any> {
  return await lookupExposedESModule<any>(options.remoteEntry, options.exposedModule);
}