module.exports = {
    default: {
      require: ['features/step_definitions/**/*.ts'], // Path to step definitions
      requireModule: ['ts-node/register'],
      format: ['json:results.json', 'node_modules/@cucumber/pretty-formatter']
    }
  };