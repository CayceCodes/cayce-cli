import {Command, Flags} from '@oclif/core'
import {Scanner, ScannerOptions} from 'cayce-core'
import {Formatter, OutputFormat, ScanRule} from 'cayce-types'
// eslint-disable-next-line n/no-extraneous-import
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
    // filter to run just one rule at a time.
    name: Flags.string({char: 'n', description: 'only execute rules matching by name', multiple: true}),
  }
  static formatter: Formatter<OutputFormat>

  public async run(): Promise<void> {
    const {flags} = await this.parse(Scan)
    await this.setFormatter(this.validateOutputFormat(flags.formatter))

    const filesToScan = await this.buildFileList(flags.directory, '**/*.cls')
    const pluginLoader = new PluginLoader('./')
    await pluginLoader.loadPlugins()
    const namesSet = new Set(flags.name)
    const categoriesSet = new Set(flags.category)
    const loadedRules = pluginLoader.getAllRules()

    const filteredRules = this.applyFilters(loadedRules, namesSet, categoriesSet)
    // Create an array of scanner promises
    const scanPromises = filesToScan.map(async (file) => {
      const scanOptions: ScannerOptions = {
        rules: filteredRules,
        sourcePath: file,
      }
      const scanner = await Scanner.create(scanOptions)
      return scanner.run()
    })

    // Wait for all scans to complete
    const results = await Promise.all(scanPromises)
    const selectedOutputFormat: OutputFormat = this.validateOutputFormat(flags.formatter)
    const formatedResults = Scan.formatter.format(results.flat(), selectedOutputFormat)
    console.log(formatedResults)
  }

  private applyFilters(rules: ScanRule[], names: Set<string>, categories: Set<string>): ScanRule[] {
    return rules.filter((rule) => {
      if (names.size > 0 && !names.has(rule.Name)) {
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
    return OutputFormat[formatter as keyof typeof OutputFormat]
  }
}
