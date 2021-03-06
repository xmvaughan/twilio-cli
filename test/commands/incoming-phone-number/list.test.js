const { expect, test, constants } = require('../../test');
const NumberList = require('../../../src/commands/incoming-phone-number/list');

describe('commands', () => {
  describe('incoming-phone-number', () => {
    describe('list', () => {
      const setUpTest = (args = []) => {
        return test
          .twilioFakeProject()
          .twilioCliEnv()
          .stdout()
          .nock('https://api.twilio.com', api =>
            api.get(`/2010-04-01/Accounts/${constants.FAKE_ACCOUNT_SID}/IncomingPhoneNumbers.json`).reply(200, {
              incoming_phone_numbers: [{ sid: 'PN123', phone_number: '+12095551212', friendly_name: 'my phone #' }] // eslint-disable-line camelcase
            })
          )
          .twilioCommand(NumberList, args);
      };

      setUpTest([]).it('runs incoming-phone-number:list', ctx => {
        expect(ctx.stdout).to.equal('SID    Phone Number  Friendly Name\nPN123  +12095551212  my phone #   \n');
      });

      setUpTest(['--properties', 'phoneNumber']).it('runs incoming-phone-number:list with custom properties', ctx => {
        expect(ctx.stdout).to.equal('Phone Number\n+12095551212\n');
      });
    });
  });
});
