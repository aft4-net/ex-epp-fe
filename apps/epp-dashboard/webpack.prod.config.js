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
    minimize: false,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        usermanagement: 'usermanagement@https://18.218.150.53/:4231/remoteEntry.js',
        resourcemanagement: 'resourcemanagement@https://18.218.150.53/:4234/remoteEntry.js',
        timesheet: 'timesheet@https://18.218.150.53/:4233/remoteEntry.js',
        clientmanagement: 'clientmanagement@https://18.218.150.53/:4235/remoteEntry.js',
        projectmanagement: 'projectmanagement@https://18.218.150.53/:4236/remoteEntry.js',
        configurationmodule: 'configurationmodule@https://18.218.150.53/:4232/remoteEntry.js',
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
