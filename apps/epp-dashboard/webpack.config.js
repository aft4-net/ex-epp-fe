const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.base.json'), [
  /* mapped paths to share */
]);

module.exports = {
  output: {
    uniqueName: 'epp-dashboard',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
    minimize: true,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        usermanagement: 'usermanagement@http://localhost:4231/remoteEntry.js',
        resourcemanagement: 'resourcemanagement@http://localhost:4234/remoteEntry.js',
        timesheet: 'timesheet@http://localhost:4233/remoteEntry.js',
        clientmanagement: 'clientmanagement@http://localhost:4235/remoteEntry.js',
        projectmanagement: 'projectmanagement@http://localhost:4236/remoteEntry.js',
        configurationmodule: 'configurationmodule@http://localhost:4232/remoteEntry.js',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/common/http': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
        ...sharedMappings.getDescriptors(),
      },
    }),
    sharedMappings.getPlugin(),
  ],
};
