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
        usermanagement: 'usermanagement@https://www.epp-excellerentsolutions.com/usermanagement/remoteEntry.js',
        resourcemanagement: 'resourcemanagement@https://www.epp-excellerentsolutions.com/resourcemanagement/remoteEntry.js',
        timesheet: 'timesheet@https://www.epp-excellerentsolutions.com/timesheet/remoteEntry.js',
        clientmanagement: 'clientmanagement@https://www.epp-excellerentsolutions.com/clientmanagement/remoteEntry.js',
        projectmanagement: 'projectmanagement@https://www.epp-excellerentsolutions.com/projectmanagement/remoteEntry.js',
        configurationmodule: 'configurationmodule@https://www.epp-excellerentsolutions.com/configurationmodule/remoteEntry.js',
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
