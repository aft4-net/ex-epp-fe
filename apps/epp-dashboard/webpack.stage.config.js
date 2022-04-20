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
        usermanagement: 'usermanagement@https://s3.eu-west-3.amazonaws.com/qa.epp-excellerentsolutions.com/remoteEntry.js',
        resourcemanagement: 'resourcemanagement@https://s3.eu-west-3.amazonaws.com/qa.epp-excellerentsolutions.com/remoteEntry.js',
        timesheet: 'timesheet@https://s3.eu-west-3.amazonaws.com/qa.epp-excellerentsolutions.com/remoteEntry.js',
        clientmanagement: 'clientmanagement@https://s3.eu-west-3.amazonaws.com/qa.epp-excellerentsolutions.com/remoteEntry.js',
        projectmanagement: 'projectmanagement@https://s3.eu-west-3.amazonaws.com/qa.epp-excellerentsolutions.com/remoteEntry.js',
        configurationmodule: 'configurationmodule@https://s3.eu-west-3.amazonaws.com/qa.epp-excellerentsolutions.com/remoteEntry.js',
        reports: 'reports@https://s3.eu-west-3.amazonaws.com/qa.epp-excellerentsolutions.com/remoteEntry.js',
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
