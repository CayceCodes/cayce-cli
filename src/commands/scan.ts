import {Command, Flags} from '@oclif/core'
// eslint-disable-next-line n/no-extraneous-import
import { glob } from 'glob'
import path from 'node:path';
import { ScanResult, Scanner, ScannerOptions } from 'sourceloupe';

import { PluginLoader } from '../plugin-loader.js';

export default class Scan extends Command {

  static override description = 'This command executes the scanner on the specified directory'

  static override examples = [
    '<%= config.bin %> <%= command.id %> -d ./src',
  ]

  static override flags = {
    // flag with no value (-f, --force)
    // force: Flags.boolean({char: 'f'})
    directory: Flags.string({char: 'd', description: 'directory to scan', required: true}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Scan)

    // Because we've marked the directory flag as required, we can be sure it will be set.
    const filesToScan = await this.buildFileList(flags.directory!, '**/*.cls');

    const pluginLoader = new PluginLoader('./');
    await pluginLoader.loadPlugins();

    // Create an array of scanner promises
    const scanPromises = filesToScan.map(file => {
      const scanOptions: ScannerOptions = {
        rules: pluginLoader.getAllRules(),
        sourcePath: file
      }
      return new Scanner(scanOptions).run();
    });

    // Wait for all scans to complete
    const results: Map<string, ScanResult[]> = await Promise.all(scanPromises);
    console.dir(results);
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
