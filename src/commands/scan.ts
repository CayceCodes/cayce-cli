import {Command, Flags} from '@oclif/core'
import {Scanner, ScannerOptions} from 'cayce-core'
import {Formatter, OutputFormat, ScanRule} from 'cayce-types'
import cliProgress from 'cli-progress'
import {glob} from 'glob'
import path from 'node:path'

import {PluginLoader} from '../plugin-loader.js'

export default class Scan extends Command {
  static override description = 'This command executes the scanner on the specified directory'
  static override examples = ['<%= config.bin %> <%= command.id %> -d ./src -f "no-console" -f "no-debugger"']
  static override flags = {
    category: Flags.string({char: 'c', description: 'only execute rules matching by category', multiple: true}),
    // flag with no value (-f, --force)
    // force: Flags.boolean({char: 'f'})
    directory: Flags.directory({char: 'd', description: 'directory to scan', required: true}),
    formatter: Flags.string({char: 'r', default: 'Csv', description: 'formatter to use for output', multiple: false}),
    // the pattern used to find what files to scan.
    glob: Flags.string({char: 'g', default: '**/*.cls', description: 'glob pattern to match files', multiple: false}),
    // filter to run just one rule at a time.
    name: Flags.string({char: 'n', description: 'only execute rules matching by name', multiple: true}),
    // filename to write results to
    outputFilename: Flags.string({char: 'o', description: 'output filename', multiple: false, required: true}),
  }
  static formatter: Formatter<OutputFormat>

  public async run(): Promise<void> {
    const {flags} = await this.parse(Scan)

    const selectedFormat = this.validateOutputFormat(flags.formatter)
    await this.setFormatter(selectedFormat)

    const filesToScan = await this.buildFileList(flags.directory, flags.glob)

    if(filesToScan.length === 0) {
      console.error(`No files matching the glob pattern ${flags.glob} found to scan`)
      return
    }

    const pluginLoader = new PluginLoader('./')
    await pluginLoader.loadPlugins()

    const namesSet = new Set(flags.name)
    const categoriesSet = new Set(flags.category)

    const loadedRules = pluginLoader.getAllRules()
    const filteredRules = this.applyFilters(loadedRules, namesSet, categoriesSet)

    // Sanity checks
    if (filteredRules.length === 0) {
      console.error('No rules found to scan')
      return
    }

    // Create an array of scanner promises
    const scanPromises = filesToScan.map(async (file) => {
      const scanOptions: ScannerOptions = {
        // Use type assertion to bridge the different versions of the same type
        rules: filteredRules,
        sourcePath: file,
      }
      const scanner = await Scanner.create(scanOptions)
      return scanner.run()
    })

    const progressBar = new cliProgress.SingleBar({
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      format: 'Scanning progress | {bar} | {percentage}% || {value}/{total} files',
      hideCursor: true,
    });
    progressBar.start(filesToScan.length, 0);
    const results = await Promise.all(
        scanPromises.map(async (currentPromise) => {
          const result = await currentPromise;
          progressBar.increment();
          return result;
        })
    );
    progressBar.stop();
    console.log('Scan complete')
    // Wait for all scans to complete

    // Use type assertion to bridge the different versions of the same type
    Scan.formatter.format(results.flat(), selectedFormat, flags.outputFilename)
    // console.log(formatedResults)

  }

  private applyFilters(rules: ScanRule[], ids: Set<string>, categories: Set<string>): ScanRule[] {
    return rules.filter((rule) => {
      if (ids.size > 0 && !ids.has(rule.Id)) {
        return false
      }

      return !(categories.size > 0 && !categories.has(rule.Category))
    })
  }

  private async buildFileList(directory: string, globPattern = '**/*'): Promise<string[]> {
    const absolutePath = path.resolve(directory)
    const globPatternWithDirectory = path.join(absolutePath, globPattern)

    return glob(globPatternWithDirectory, {
      absolute: true,
      follow: true,
      nodir: true,
    })
  }

  private async setFormatter(formatter: OutputFormat) {
    switch (formatter) {
      case OutputFormat.Csv: {
        const {CsvFormatter} = await import('cayce-types')
        Scan.formatter = new CsvFormatter()
        break
      }

      case OutputFormat.Json: {
        const {JsonFormatter} = await import('cayce-types')
        Scan.formatter = new JsonFormatter()
        break
      }

      case OutputFormat.Sarif: {
        const {SarifFormatter} = await import('cayce-types')
        Scan.formatter = new SarifFormatter()
        break
      }

      case OutputFormat.Xml: {
        const {XmlFormatter} = await import('cayce-types')
        Scan.formatter = new XmlFormatter()
        break
      }
    }
  }

  private validateOutputFormat(formatter: string): OutputFormat {
    formatter = formatter.replace(/^./, char => char.toUpperCase())
    return OutputFormat[formatter as keyof typeof OutputFormat]
  }
}
