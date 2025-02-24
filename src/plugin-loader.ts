import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';
import { ScanRule, SourceLoupePlugin } from 'sourceloupe-types';

/**
 * Represents the constructor type for a SourceLoupe plugin.
 * This type is used to ensure type safety when dynamically importing plugins.
 */
type PluginConstructor = new () => SourceLoupePlugin;

/**
 * PluginLoader is responsible for dynamically loading and managing SourceLoupe plugins.
 * It provides functionality to discover, load, and validate plugins based on project dependencies.
 *
 * It's important to note that this plugin system is based on convention. In order for this plugin loader
 * to discover and load plugins, the plugin must be named with the prefix `sourceloupe-plugin-`. I.E.
 * `sourceloupe-plugin-apex` or `sourceloupe-plugin-our-corp-rules`. Additionally, this plugin loader
 * only looks for plugins to load in the `dependencies` and `devDependencies` fields of the project's package.json.
 */
export class PluginLoader {
    private readonly PLUGIN_PREFIX = 'sourceloupe-plugin-';
    private plugins: SourceLoupePlugin[] = [];

    /**
     * @param projectRoot - The root directory of the project where plugins are to be loaded from.
     */
    constructor(private projectRoot: string) {}

    /**
     * Retrieves all rules from loaded plugins.
     * This method aggregates rules from all plugins, providing a centralized collection of scan rules.
     *
     * @returns An array of all scan rules from all loaded plugins.
     */
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

    /**
     * Loads all SourceLoupe plugins found in the project's dependencies.
     * This method orchestrates the plugin discovery and loading process, ensuring that
     * all valid plugins are loaded and ready for use in the application.
     */
    async loadPlugins(): Promise<void> {
        try {
            const pluginDependencies = this.findPluginDependencies();
            for (const pluginName of pluginDependencies) {
                await this.loadAndValidatePlugin(pluginName);
            }
        } catch (error) {
            console.error('Failed to load plugins:', error);
            throw error;
        }
    }

    /**
     * Retrieves and parses the package.json file of the project.
     * This method is crucial for identifying plugin dependencies and is separated
     * to improve testability and potential reuse.
     *
     * @returns The parsed contents of the package.json file.
     */
    private getPackageJson(): Record<string, any> {
        const packageJsonPath = path.join(this.projectRoot, 'package.json');
        return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    }

    /**
     * Identifies SourceLoupe plugin dependencies from the project's package.json.
     * This method is key to the plugin discovery process, filtering dependencies
     * based on the plugin naming convention.
     *
     * @returns An array of plugin names that match the SourceLoupe plugin convention.
     */
    private findPluginDependencies(): string[] {
        const packageJson = this.getPackageJson();
        const allDependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
        return Object.keys(allDependencies).filter(dep => dep.startsWith(this.PLUGIN_PREFIX));
    }

    /**
     * Identifies SourceLoupe plugin dependencies from the project's package.json.
     * This method is key to the plugin discovery process, filtering dependencies
     * based on the plugin naming convention.
     *
     * @returns An array of plugin names that match the SourceLoupe plugin convention.
     */
    private async loadAndValidatePlugin(pluginName: string): Promise<void> {
        const importPath = path.join(this.projectRoot, 'node_modules', pluginName, 'dist', 'index.js');
        if (!fs.existsSync(importPath)) {
            console.warn(`Plugin ${pluginName} not found at ${importPath}`);
            return;
        }

        try {
            const { default: PluginClass } = await import(url.pathToFileURL(importPath).href) as { default: PluginConstructor };
            const instance = new PluginClass();
            if (this.isValidPlugin(instance)) {
                this.plugins.push(instance);
            } else {
                console.warn(`Plugin ${pluginName} does not implement the required interface`);
            }
        } catch (error) {
            console.error(`Failed to load or instantiate plugin ${pluginName}:`, error);
        }
    }

    /**
     * Validates if a given object is a valid SourceLoupe plugin.
     * This method ensures type safety and interface compliance for dynamically loaded plugins.
     * Note: it's important to note that this method is a type predicate and that the validation is done
     * largely by type predicate. The only additional validation is to ensure that the object has a `getRules` method.
     *
     * @param plugin - The object to validate as a SourceLoupe plugin.
     * @returns A type predicate indicating if the object is a valid SourceLoupe plugin.
     */
    private isValidPlugin(plugin: any): plugin is SourceLoupePlugin {
        return typeof plugin.getRules === 'function';
    }
}
