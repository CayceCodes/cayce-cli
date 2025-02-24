import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';
import { ScanRule, SourceLoupePlugin } from 'sourceloupe-types';

type PluginConstructor = new () => SourceLoupePlugin;

type LoadedPlugin = {
    plugin: { default: PluginConstructor },
    pluginName: string
};

export class PluginLoader {
    private readonly PLUGIN_PREFIX = 'sourceloupe-plugin-';
    private plugins: SourceLoupePlugin[] = [];

    constructor(private projectRoot: string) {}

    getAllRules(): ScanRule[] {
        const allRules: ScanRule[] = [];
        for (const plugin of this.plugins) {
            try {
                allRules.push(...plugin.getRules());
            } catch (error) {
                console.error(`Failed to get rules from plugin:`, error);
            }
        }
        return allRules;
    }

    async loadPlugins(): Promise<void> {
        try {
            const packageJsonPath = path.join(this.projectRoot, 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

            const allDependencies = {
                ...packageJson.dependencies,
                ...packageJson.devDependencies
            };

            const pluginDependencies = Object.keys(allDependencies)
                .filter(dep => dep.startsWith(this.PLUGIN_PREFIX));

            const loadPromises = pluginDependencies.map(async (pluginName) => {
                try {
                    const importPath = path.join(this.projectRoot, 'node_modules', pluginName, 'dist', 'index.js');
                    if (!fs.existsSync(importPath)) {
                        console.warn(`Plugin ${pluginName} not found at ${importPath}`);
                        return null;
                    }
                    console.log('Importing:', importPath);
                    const plugin = await import(url.pathToFileURL(importPath).href) as { default: PluginConstructor };
                    return { plugin, pluginName };
                } catch (error) {
                    console.error(`Failed to load plugin ${pluginName}:`, error);
                    return null;
                }
            });

            const loadedPlugins = await Promise.all(loadPromises);

            for (const loadedPlugin of loadedPlugins.filter((result): result is LoadedPlugin => result !== null)) {
                const PluginClass = loadedPlugin.plugin.default;
                try {
                    const instance = new PluginClass();
                    if (this.isValidPlugin(instance)) {
                        this.plugins.push(instance);
                    } else {
                        console.warn(`Plugin ${loadedPlugin.pluginName} does not implement the required interface`);
                    }
                } catch (error) {
                    console.error(`Failed to instantiate plugin ${loadedPlugin.pluginName}:`, error);
                }
            }
        } catch (error) {
            console.error('Failed to load plugins:', error);
            throw error;
        }
    }

    private isValidPlugin(plugin: any): plugin is SourceLoupePlugin {
        return typeof plugin.getRules === 'function';
    }
}
