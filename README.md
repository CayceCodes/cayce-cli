sourceloupe-cli
=================

A CLI interface to SourceLoupe, the most excellent Apex Static Code Analysis tool built with tree-sitter


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sourceloupe-cli.svg)](https://npmjs.org/package/sourceloupe-cli)
[![Downloads/week](https://img.shields.io/npm/dw/sourceloupe-cli.svg)](https://npmjs.org/package/sourceloupe-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g cayce-cli
$ sloupe COMMAND
running command...
$ sloupe (--version)
cayce-cli/0.0.2 darwin-arm64 node-v22.14.0
$ sloupe --help [COMMAND]
USAGE
  $ sloupe COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sloupe help [COMMAND]`](#sloupe-help-command)
* [`sloupe plugins`](#sloupe-plugins)
* [`sloupe plugins add PLUGIN`](#sloupe-plugins-add-plugin)
* [`sloupe plugins:inspect PLUGIN...`](#sloupe-pluginsinspect-plugin)
* [`sloupe plugins install PLUGIN`](#sloupe-plugins-install-plugin)
* [`sloupe plugins link PATH`](#sloupe-plugins-link-path)
* [`sloupe plugins remove [PLUGIN]`](#sloupe-plugins-remove-plugin)
* [`sloupe plugins reset`](#sloupe-plugins-reset)
* [`sloupe plugins uninstall [PLUGIN]`](#sloupe-plugins-uninstall-plugin)
* [`sloupe plugins unlink [PLUGIN]`](#sloupe-plugins-unlink-plugin)
* [`sloupe plugins update`](#sloupe-plugins-update)
* [`sloupe scan`](#sloupe-scan)

## `sloupe help [COMMAND]`

Display help for sloupe.

```
USAGE
  $ sloupe help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for sloupe.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.26/src/commands/help.ts)_

## `sloupe plugins`

List installed plugins.

```
USAGE
  $ sloupe plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ sloupe plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/index.ts)_

## `sloupe plugins add PLUGIN`

Installs a plugin into sloupe.

```
USAGE
  $ sloupe plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into sloupe.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SLOUPE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SLOUPE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ sloupe plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ sloupe plugins add myplugin

  Install a plugin from a github url.

    $ sloupe plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ sloupe plugins add someuser/someplugin
```

## `sloupe plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ sloupe plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ sloupe plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/inspect.ts)_

## `sloupe plugins install PLUGIN`

Installs a plugin into sloupe.

```
USAGE
  $ sloupe plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into sloupe.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SLOUPE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SLOUPE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ sloupe plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ sloupe plugins install myplugin

  Install a plugin from a github url.

    $ sloupe plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ sloupe plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/install.ts)_

## `sloupe plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ sloupe plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ sloupe plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/link.ts)_

## `sloupe plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sloupe plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sloupe plugins unlink
  $ sloupe plugins remove

EXAMPLES
  $ sloupe plugins remove myplugin
```

## `sloupe plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ sloupe plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/reset.ts)_

## `sloupe plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sloupe plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sloupe plugins unlink
  $ sloupe plugins remove

EXAMPLES
  $ sloupe plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/uninstall.ts)_

## `sloupe plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ sloupe plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sloupe plugins unlink
  $ sloupe plugins remove

EXAMPLES
  $ sloupe plugins unlink myplugin
```

## `sloupe plugins update`

Update installed plugins.

```
USAGE
  $ sloupe plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/update.ts)_

## `sloupe scan`

This command executes the scanner on the specified directory

```
USAGE
  $ sloupe scan -d <value> [-c <value>...] [-r <value>] [-n <value>...]

FLAGS
  -c, --category=<value>...  only execute rules matching by category
  -d, --directory=<value>    (required) directory to scan
  -n, --name=<value>...      only execute rules matching by name
  -r, --formatter=<value>    [default: Csv] formatter to use for output

DESCRIPTION
  This command executes the scanner on the specified directory

EXAMPLES
  $ sloupe scan -d ./src -f "no-console" -f "no-debugger"
```

_See code: [src/commands/scan.ts](https://github.com/CayceCodes/cayce-cli/blob/v0.0.2/src/commands/scan.ts)_
<!-- commandsstop -->
