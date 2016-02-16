// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * A rate limiter for streaming changes. This is done on a queued token based
 * system. Tokens that come it at too high a rate are queued. Before the
 * callback is called, a concat function is called to merge them. This is done
 * on a cooldown bases, so the first token is not blocked.
 */
angular.module('app').factory('atRateLimiter', [
  '$timeout',
  function($timeout) {
    return function(cooldownMs, callback, optMergeFun) {
      // Default merge function. Works with arrays and strings
      optMergeFun = optMergeFun || function(left, right) {
        return left.concat(right);
      };

      /**
       * When the next hanler can be called
       *
       * @private
       */
      this.readyAt_ = Date.now();

      /**
       * The defered item. It has already been concatinated with the other items
       * that were push while waiting for a flush
       *
       * @private
       */
      this.deferedItem_ = null;

      /**
       * The timeout for defered items
       *
       * @private
       */
      this.timeout_ = null;

      // Use Date.now() for current MS
      this.push = function(item) {
        var now = Date.now();
        if (now >= this.readyAt_) {
          // Perform action now, don't bother to wait
          this.readyAt_ = now + cooldownMs;
          callback(item);
        } else {
          if (this.deferedItem_) {
            this.deferedItem_ = optMergeFun(this.deferedItem_, item);
          } else {
            this.deferedItem_ = item;
          }
          if (!this.timeout_) {
            var remainingTime = this.readyAt_ - now;
            var that = this;
            this.timeout_ = $timeout(function() {
              callback(that.deferedItem_);
              that.timeout_ = null;
              that.deferedItem_ = null;
            }, remainingTime);
          }
        }
      };
    };
  }
]);
