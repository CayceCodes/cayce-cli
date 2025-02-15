import {Command, Flags} from '@oclif/core'
// eslint-disable-next-line n/no-extraneous-import
import { glob } from 'glob'
import path from 'node:path';
import { Scanner, ScannerOptions } from 'sourceloupe';
import { ScanResult, ScanRule } from 'sourceloupe-types';

import { PluginLoader } from '../plugin-loader.js';

export default class Scan extends Command {

  static override description = 'This command executes the scanner on the specified directory'

  static override examples = [
    '<%= config.bin %> <%= command.id %> -d ./src -f "no-console" -f "no-debugger"',
  ]

  static override flags = {
    // flag with no value (-f, --force)
    // force: Flags.boolean({char: 'f'})
    directory: Flags.string({char: 'd', description: 'directory to scan', required: true}),
    // filter to run just one rule at a time.
    name: Flags.string({char: 'n', description: 'only execute rules matching by name', multiple: true}),
    category: Flags.string({char: 'c', description: 'only execute rules matching by category', multiple: true}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Scan)

    // Because we've marked the directory flag as required, we can be sure it will be set.
    const filesToScan = await this.buildFileList(flags.directory!, '**/*.cls');

    const pluginLoader = new PluginLoader('./');
    await pluginLoader.loadPlugins();
    const namesSet = new Set(flags.name);
    const categoriesSet = new Set(flags.category);
    const loadedRules = pluginLoader.getAllRules() as ScanRule[];
    const filteredRules = this.applyFilters(loadedRules, namesSet, categoriesSet);
    // Create an array of scanner promises
    const scanPromises = filesToScan.map(async file => {
      const scanOptions: ScannerOptions = {
        rules: filteredRules as ScanRule[],
        sourcePath: file
      }
      const scanner = await Scanner.create(scanOptions);
      return scanner.run();
    });

    // Wait for all scans to complete
    const results = this.flattenResults(await Promise.all(scanPromises));
    console.dir(results);
  }

  private flattenResults(results: Map<string, ScanResult[]>[]): Map<string, ScanResult[]> {
    return results.reduce((acc, map) => {
      for (const entry of map.entries()) {
        const [key, value] = entry;
        acc.set(key, [...(acc.get(key) || []), ...value]);
      }
      return acc;
    }, new Map<string, ScanResult[]>());
  }

  private applyFilters(rules: ScanRule[], names: Set<string>, categories: Set<string>): ScanRule[] {
    return rules.filter(rule => {
      if (names.size > 0 && !names.has(rule.Name)) {
        return false;
      }
      return !(categories.size > 0 && !categories.has(rule.Category));
    });
  }

  private async buildFileList(directory: string, globPattern: string = '**/*'): Promise<string[]> {
    const absolutePath = path.resolve(directory);
    const globPatternWithDirectory = path.join(absolutePath, globPattern);

    return glob(globPatternWithDirectory, {
      absolute: true,
      follow: true,
      nodir: true
    });
  }
}
