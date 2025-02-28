import {runCommand} from '@oclif/test'
import {expect} from 'chai'
// import * as sinon from 'sinon'
// import * as path from 'path'
import {Scanner, ScannerOptions} from 'cayce-core';
import {OutputFormat, ScanRule} from 'cayce-types';
import {PluginLoader} from '../../src/plugin-loader.js';

// describe('scan', () => {
//   it('runs scan cmd', async () => {
//     const {stdout} = await runCommand('scan')
//     expect(stdout).to.contain('hello world')
//   })
//
//   it('runs scan --name oclif', async () => {
//     const {stdout} = await runCommand('scan --name oclif')
//     expect(stdout).to.contain('hello oclif')
//   })
// })
describe('scan', () => {
    // let scannerStub: sinon.SinonStub
    // let pluginLoaderStub: sinon.SinonStub
    // let formatterStub: sinon.SinonStub

    // beforeEach(() => {
    //     scannerStub = sinon.stub(Scanner, 'create').resolves({
    //         run: sinon.stub().resolves([{ruleName: 'TestRule', message: 'Test message'}]),
    //     })
    //     pluginLoaderStub = sinon.stub(PluginLoader.prototype, 'loadPlugins').resolves()
    //     pluginLoaderStub = sinon.stub(PluginLoader.prototype, 'getAllRules').returns([
    //         {Name: 'Rule1', Category: 'Cat1'} as ScanRule,
    //         {Name: 'Rule2', Category: 'Cat2'} as ScanRule,
    //     ])
    //     formatterStub = sinon.stub().returns('Formatted output')
    // })
    //
    // afterEach(() => {
    //     sinon.restore()
    // })

        it('runs scan with directory flag', async () => {
            const {stderr} = await runCommand(['scan', '-d', './src']);
            expect(stderr).to.contain('No files matching the glob pattern')
        })

    // runCommand('scan')
    //     .stdout()
    //     .command(['scan', '-d', './src', '-n', 'Rule1'])
    //     .it('filters rules by name', ctx => {
    //         expect(ctx.stdout).to.contain('Formatted output')
    //         const options: ScannerOptions = scannerStub.firstCall.args[0]
    //         expect(options.rules).to.have.lengthOf(1)
    //         expect(options.rules[0].Name).to.equal('Rule1')
    //     })
    //
    // runCommand('scan')
    //     .stdout()
    //     .command(['scan', '-d', './src', '-c', 'Cat2'])
    //     .it('filters rules by category', ctx => {
    //         expect(ctx.stdout).to.contain('Formatted output')
    //         const options: ScannerOptions = scannerStub.firstCall.args[0]
    //         expect(options.rules).to.have.lengthOf(1)
    //         expect(options.rules[0].Category).to.equal('Cat2')
    //     })
    //
    // runCommand('scan')
    //     .stdout()
    //     .command(['scan', '-d', './src', '-r', 'Json'])
    //     .it('uses JSON formatter', ctx => {
    //         expect(ctx.stdout).to.contain('Formatted output')
    //         expect(formatterStub.calledWith(sinon.match.any, OutputFormat.Json)).to.be.true
    //     })
    //
    // test
    //     .stdout()
    //     .command(['scan', '-d', './src'])
    //     .it('handles multiple files', async ctx => {
    //         const globStub = sinon.stub().resolves(['file1.cls', 'file2.cls'])
    //         const ScanCommand = (await import('../../src/commands/scan')).default
    //         sinon.stub(ScanCommand.prototype as any, 'buildFileList').resolves(['file1.cls', 'file2.cls'])
    //
    //         expect(ctx.stdout).to.contain('Formatted output')
    //         expect(scannerStub.calledTwice).to.be.true
    //     })
})