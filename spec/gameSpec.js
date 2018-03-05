'use strict';

describe('Game', function() {
  var game, perfectGame, strikeFrames, spareFrame,
    strikeFrame, strike, spare, nine;

  beforeEach(function(){
    game = new Game();
    perfectGame = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    strikeFrames = [[10, 10], [10], [10]];
    spareFrame = [[8,2], [5,2]];
    strikeFrame = [[10], [8,2]];
    strike = [10];
    spare = [8, 2];
    nine = [8, 1];
  });

  describe('The .addBonuses function', function() {
    it('adds bonuses to strikeFrames', function() {
      expect(game.addBonuses(strikeFrames))
        .toEqual([[10, 10, 10], [10, 10], [10]]);
    });

    it('adds bonuses to spareFrames', function() {
      expect(game.addBonuses(spareFrame)).toEqual([[8, 2, 5], [5, 2]]);
    });
  });

  describe('The flattenAndSum function', function() {
    it('flattens an array and returns the sum', function() {
      expect(game.flattenAndSum(strikeFrames)).toEqual(40);
    });
  });

  describe('The addRollToFrame function', function() {
    it('creates an array for the current frame', function() {
      expect(game.addRollToFrame([], 0, 2)).toEqual([[2]]);
    });

    it('adds the second roll to a frame', function() {
      expect(game.addRollToFrame([[2]], 0, 2)).toEqual([[2, 2]]);
    });

    it('adds a third roll to the tenth frame', function(){
      expect(game.addRollToFrame([[],[],[],[],[],[],[],[],[],[2,2]], 9, 2))
      .toEqual([[],[],[],[],[],[],[],[],[],[2, 2, 2]]);
    });
  });

  describe('The checkCompleteFrame function', function() {
    it('increments frameCount if the frame is complete', function() {
      expect(game.checkCompleteFrame([strike], 0)).toEqual(1);
    });

    it('won\'t increment frameCount if the frame is not complete', function() {
      expect(game.checkCompleteFrame([[8]], 0)).toEqual(0);
    });
  });

  describe('The checkFrameTen function', function() {
    it('increments frameCount if the strike frame is complete', function() {
      expect(game.checkFrameTen([[10, 8, 2]], 0)).toEqual(1);
    });

    it('increments frameCount if the no strike frame is complete', function() {
      expect(game.checkFrameTen([nine], 0)).toEqual(1);
    });

    it('won\'t increment frameCount if the frame is not complete', function() {
      expect(game.checkFrameTen([[8]], 0)).toEqual(0);
    });
  });

  describe('The isStrike function', function(){
    it('returns true if the frame is a strike', function() {
      expect(game.isStrike(strike)).toEqual(true);
    });

    it('returns false if the frame is a spare', function() {
      expect(game.isStrike(spare)).toEqual(false);
    });

    it('returns false if the frame is neither', function() {
      expect(game.isStrike(nine)).toEqual(false);
    });
  });

  describe('The isSpare function', function(){
    it('returns true if the frame is a spare', function() {
      expect(game.isSpare([8, 2])).toEqual(true);
    });

    it('returns false if the frame is a strike', function() {
      expect(game.isSpare([10])).toEqual(false);
    });

    it('returns false if the frame is neither', function() {
      expect(game.isSpare([8, 1])).toEqual(false);
    });
  });

  describe('The hasBonus function', function(){
    it('returns true if the frame has a bonus', function() {
      expect(game.hasBonus([8, 2, 10])).toEqual(true);
    });

    it('returns false if the frame doesn\'t have a bonus', function() {
      expect(game.hasBonus([10])).toEqual(false);
    });
  });

  describe('The getRemainingPins function', function(){
    it('returns the remaining pins if roll one is not a strike', function(){
      expect(game.getRemainingPins([8])).toEqual(ALL_PINS - 8);
    });

    it('returns ten for a strike frame', function() {
      expect(game.getRemainingPins(strike)).toEqual(ALL_PINS);
    });

    it('returns ten on roll two', function() {
      expect(game.getRemainingPins(nine)).toEqual(ALL_PINS);
    });

    it('returns ten for a nil frame', function() {
      expect(game.getRemainingPins([][0])).toEqual(ALL_PINS);
    });
  });
});
