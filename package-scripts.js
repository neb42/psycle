const {
  series: { nps: series },
  // concurrent: { nps: parallel },
} = require('nps-utils');

module.exports = {
  scripts: {
    default: 'nps help',
    adler: {
      update: {
        script: series('adler.updateWebComponents', 'adler.updateTokens', 'adler.updateLegacy'),
        description: '',
      },
      updateTokens: {
        script: 'yarn add @faculty/adler-web-components@latest',
        description: '',
      },
      updateWebComponents: {
        script: 'yarn add @faculty/adler-tokens@latest',
        description: '',
      },
      updateLegacy: {
        script: 'yarn add @asidatascience/adler-ui',
        description: '',
      },
    },
  },
};
