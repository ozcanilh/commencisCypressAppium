import 'cypress-mochawesome-reporter/register';
import './commands/general_commands';
import './commands/techcrunch_commands';

Cypress.on('uncaught:exception', (err) => {
  // Do not fail tests for uncaught app-side runtime errors on TechCrunch.
  return false;
});
