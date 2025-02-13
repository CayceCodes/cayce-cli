import * as fs from 'node:fs';
import * as path from 'node:path';
import { ScanRule, SourceLoupePlugin } from 'sourceloupe-types';

type LoadedPlugin = {
    plugin: { default: SourceLoupePlugin },
    pluginName: string
};

export class PluginLoader {
    private readonly PLUGIN_PREFIX = 'sourceloupe-plugin-';
    private plugins: SourceLoupePlugin[] = [];

    constructor(private projectRoot: string) {
    }

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

            // Combine dependencies and devDependencies
            const allDependencies = {
                ...packageJson.dependencies,
                ...packageJson.devDependencies
            };

            // Filter for sourceloupe plugins
            const pluginDependencies = Object.keys(allDependencies)
                .filter(dep => dep.startsWith(this.PLUGIN_PREFIX));

            // Load all plugins concurrently
            const loadPromises = pluginDependencies.map(async (pluginName) => {
                try {
                    const plugin = await import(pluginName) as { default: SourceLoupePlugin };
                    return {
                        plugin,
                        pluginName // Return the actual plugin name string, not plugin.default
                    };
                } catch (error) {
                    console.error(`Failed to load plugin ${pluginName}:`, error);
                    return null;
                }
            });

            const loadedPlugins = await Promise.all(loadPromises);

            // Filter out failed loads and validate plugins
            for (const loadedPlugin of loadedPlugins.filter((result): result is LoadedPlugin => result !== null)) {
                if (this.isValidPlugin(loadedPlugin.plugin.default)) {
                    this.plugins.push(loadedPlugin.plugin.default);
                } else {
                    console.warn(`Plugin ${loadedPlugin.pluginName} does not implement the required interface`);
                }
            }
        } catch (error) {
            console.error('Failed to load plugins:', error);
            throw error;
        }
    }

    private isValidPlugin(plugin: SourceLoupePlugin): plugin is SourceLoupePlugin {
        return plugin && typeof plugin.getRules === 'function';
    }


}