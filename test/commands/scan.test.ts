import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('scan', () => {
  it('runs scan cmd', async () => {
    const {stdout} = await runCommand('scan')
    expect(stdout).to.contain('hello world')
  })

  it('runs scan --name oclif', async () => {
    const {stdout} = await runCommand('scan --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
