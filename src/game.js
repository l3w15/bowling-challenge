'use strict';

const STRIKE = 10,
      SPARE = 10,
      ALL_PINS = 10,
      MAX_ROLLS = 3,
      MAX_FRAMES = 10;
var   roll1 = 0,
      roll2 = 1;


var Game = function() {};

Game.prototype = {

  addBonuses(frames) {
    var l = frames.length;
    var [antepenult, penult, ult] = [frames[l - 3], frames[l - 2], frames[l -1]];
    if (l > 2 && this.isStrike(antepenult) && !this.hasBonus(antepenult)) {
      antepenult.push(ult[roll1]);
      ult[roll2] ? penult.push(ult[roll1], ult[roll2]) : penult.push(ult[roll1]);
    } else if (l > 1 && this.isStrike(penult) && !this.hasBonus(penult)) {
      ult[roll2] && ult[roll2] !== 10 ?
      penult.push(ult[roll1], ult[roll2]) : penult.push(ult[roll1]);
    } else if (l > 1 && this.isSpare(penult) && !this.hasBonus(penult)) {
      penult.push(ult[roll1]);
    }
    return frames;
  },

  flattenAndSum(array) {
    array = array.reduce(function(acc, curr) {
      return acc.concat(curr);
    }, []);

    return array = array.reduce(function (acc, curr) {
      return acc + curr;
    });
  },

  addRollToFrame(frames, count, roll) {
    if (frames.length < MAX_FRAMES && !frames[count]) {
      frames[count] = [roll];
    } else if (frames.length < MAX_FRAMES) {
      frames[count].push(roll);
    } else {
      frames[count] ? frames[count].push(roll) : frames[count] = [roll];
    }
    return frames;
  },

  checkCompleteFrame(frames, count) {
    if (frames[count][roll1] === STRIKE || frames[count].length === 2) {
      frames = this.addBonuses(frames);
      count ++;
    }
    return count;
  },

  checkFrameTen(frames, count) {
    if (frames[count].length === MAX_ROLLS
      || frames[count][roll1] + frames[count][roll2] < SPARE) {
    count ++;
    }
    return count;
  },

  isStrike(frame) {
    return frame[roll1] === STRIKE ? true : false;
  },

  isSpare(frame) {
    return frame[roll1] + frame[roll2] === SPARE ? true : false;
  },

  hasBonus(frame) {
    return frame.length === MAX_ROLLS;
  },

  getRemainingPins(frame) {
    return frame && !frame[roll2] && frame[roll1] < STRIKE ?
      ALL_PINS - frame[roll1] : ALL_PINS;
  }
}
