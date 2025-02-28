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
$ cayce COMMAND
running command...
$ cayce (--version)
cayce-cli/0.0.7 darwin-arm64 node-v22.14.0
$ cayce --help [COMMAND]
USAGE
  $ cayce COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cayce help [COMMAND]`](#cayce-help-command)
* [`cayce plugins`](#cayce-plugins)
* [`cayce plugins add PLUGIN`](#cayce-plugins-add-plugin)
* [`cayce plugins:inspect PLUGIN...`](#cayce-pluginsinspect-plugin)
* [`cayce plugins install PLUGIN`](#cayce-plugins-install-plugin)
* [`cayce plugins link PATH`](#cayce-plugins-link-path)
* [`cayce plugins remove [PLUGIN]`](#cayce-plugins-remove-plugin)
* [`cayce plugins reset`](#cayce-plugins-reset)
* [`cayce plugins uninstall [PLUGIN]`](#cayce-plugins-uninstall-plugin)
* [`cayce plugins unlink [PLUGIN]`](#cayce-plugins-unlink-plugin)
* [`cayce plugins update`](#cayce-plugins-update)
* [`cayce scan`](#cayce-scan)

## `cayce help [COMMAND]`

Display help for cayce.

```
USAGE
  $ cayce help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cayce.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.26/src/commands/help.ts)_

## `cayce plugins`

List installed plugins.

```
USAGE
  $ cayce plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ cayce plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/index.ts)_

## `cayce plugins add PLUGIN`

Installs a plugin into cayce.

```
USAGE
  $ cayce plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

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
  Installs a plugin into cayce.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CAYCE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CAYCE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ cayce plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ cayce plugins add myplugin

  Install a plugin from a github url.

    $ cayce plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ cayce plugins add someuser/someplugin
```

## `cayce plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ cayce plugins inspect PLUGIN...

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
  $ cayce plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/inspect.ts)_

## `cayce plugins install PLUGIN`

Installs a plugin into cayce.

```
USAGE
  $ cayce plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

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
  Installs a plugin into cayce.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the CAYCE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the CAYCE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ cayce plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ cayce plugins install myplugin

  Install a plugin from a github url.

    $ cayce plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ cayce plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/install.ts)_

## `cayce plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ cayce plugins link PATH [-h] [--install] [-v]

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
  $ cayce plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/link.ts)_

## `cayce plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cayce plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cayce plugins unlink
  $ cayce plugins remove

EXAMPLES
  $ cayce plugins remove myplugin
```

## `cayce plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ cayce plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/reset.ts)_

## `cayce plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cayce plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cayce plugins unlink
  $ cayce plugins remove

EXAMPLES
  $ cayce plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/uninstall.ts)_

## `cayce plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ cayce plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cayce plugins unlink
  $ cayce plugins remove

EXAMPLES
  $ cayce plugins unlink myplugin
```

## `cayce plugins update`

Update installed plugins.

```
USAGE
  $ cayce plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.34/src/commands/plugins/update.ts)_

## `cayce scan`

This command executes the scanner on the specified directory

```
USAGE
  $ cayce scan -d <value> [-c <value>...] [-r <value>] [-g <value>] [-n <value>...]

FLAGS
  -c, --category=<value>...  only execute rules matching by category
  -d, --directory=<value>    (required) directory to scan
  -g, --glob=<value>         [default: **/*.cls] glob pattern to match files
  -n, --name=<value>...      only execute rules matching by name
  -r, --formatter=<value>    [default: Csv] formatter to use for output

DESCRIPTION
  This command executes the scanner on the specified directory

EXAMPLES
  $ cayce scan -d ./src -f "no-console" -f "no-debugger"
```

_See code: [src/commands/scan.ts](https://github.com/CayceCodes/cayce-cli/blob/v0.0.7/src/commands/scan.ts)_
<!-- commandsstop -->
