/**
 * Checks that an mp3 plays through a point in time
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.playing(1);
 *    };
 * ```
 *
 * @method isPlaying
 * @param {Integer} timestamp Timestamp we expect to pass through in time
 * @param {String} mp3name Exact mp3 we care about checking
 * @api assertions
 */

const playing = function (timestamp=0.3, mp3name=null) {
  if (mp3name) {
    this.message = `Testing if ${mp3name} plays through the ${timestamp} second mark`;
  } else {
    this.message = `Testing if mp3 plays through the ${timestamp} second mark`
  }

  this.expected = () => {
    return true; // what the assertion is tested against
  };

  this.evaluate = (value) => {
    // works with track:whilePlaying and track:playing
    let playingRegex = new RegExp(`laying - (\\d+\\.\\d+)`)

    // Supports variable numbers before the track name
    // 5981.4 ms: track:whilePlaying - 0.66181 4.4408 3.7789900000000003 0.14902945415240496 0.66181 short-continuous-2.mp3 2
    if (mp3name) {
      playingRegex = new RegExp(`laying - (\\d+\\.\\d+\\s)+${mp3name.replace('.', '\\.')}`)
    }

    // We care about actively catching the mp3 passing through a point in time,
    // Therefore we not only want to test that it's greater than that mark
    // But that playback is actively within a 2 second tolerance window of that mark.
    // This helps us test things like repeating the same track being played, etc
    if(value.match(playingRegex)) {
      const secondsPlayed = parseFloat(value.match(playingRegex)[1] || 0)
      return (secondsPlayed > timestamp) && (secondsPlayed < (timestamp + 5))
    }
    return false
  };

  this.value = (result) => {
    // audioNode:whilePlaying - 1.638909446 short-continuous-1.mp3
    return result.value; // passed to this.pass
  };

  this.command = (callback) => {
    return this.api.getText('#debug', callback); // passed to this.value
  };
};

module.exports.assertion = playing;