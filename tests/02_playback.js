module.exports = {
  'Clicking play on a track starts audio': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body')
      .click('#track1')
      .assert.containsText('#debug', 'nodepool:create')
      .pause(2000)
      .assert.containsText('#debug', 'playing: 2')
      .end()
  },
  'Clicking play on a track after clicking anywhere starts audio': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('body')
      .click('#logo')
      .waitForElementVisible('#debug', 1000)
      .click('a.track:nth-of-type(1)')
      .assert.containsText('#debug', 'nodepool:create')
      .pause(2000)
      .assert.containsText('#debug', 'playing: 2')
      .end()
  }
}
