declare module 'libarchive.js' {
    interface Entry {
        file: {
            name: string;
        };
        getText(): Promise<string>;
    }

    interface Archive {
        getFilesArray(): Promise<Entry[]>;
    }

    interface ArchiveModule {
        init(options: { workerUrl: string; wasmUrl: string }): Promise<void>;
        open(file: File): Promise<Archive>;
    }

    const module: ArchiveModule;
    export = module;
} 