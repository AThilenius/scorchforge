// Copyright 2015 Alec Thilenius
// All rights reserved.

/**
 * Tracks all connected (shared) user's cursor for a given file tree, as well as
 * sending cursor state.
 */
angular.module('app').factory('CursorTracker', ['$timeout', '$interval', 'md5',
  function($timeout, $interval, md5) {
    return function(person, project) {

      /**
       * A map filePath: [{
       *   filePath,
       *   fullName,
       *   emailHash,
       *   cursor: {row, column},
       *   undefined | selection: Range{},
       *   expirationTimer_
       * }]
       */
      this.remoteCurSels = {};
      this.selections = {};

      this.project_ = project;
      this.socket_ = io.connect();
      this.room_ = 'project-' + this.project_.id + '-cursors';
      this.fullName_ = person.firstName.capitalizeFirstLetter() +
        ' ' + person.lastName.capitalizeFirstLetter();
      this.emailHash_ = md5.createHash(person.email);
      // Maps emailHash => entry
      this.remoteCurSelsIndex_ = {};
      this.repeatSendTimer = null;

      /**
       * Sets this users state (sending it to clients). Takes in the path of the
       * active file, a {row, column} object for cursorLocation and a Range for
       * selectionRange. cursorLocation and selectionRange can come from ACE.
       */
      this.setState = function(activeFilePath, cursorLoc, selStart,
        selEnd) {
        var data = {
          room: this.room_,
          fN: this.fullName_,
          eH: this.emailHash_,
          aFP: activeFilePath,
          cL: cursorLoc
        };
        if (selStart.row !== selEnd.row || selStart.column !== selEnd.column) {
          // Add selection to the data
          data.sr = {
            sSr: Math.min(selStart.row, selEnd.row),
            sSc: Math.min(selStart.column, selEnd.column),
            sEr: Math.max(selStart.row, selEnd.row),
            sEc: Math.max(selStart.column, selEnd.column)
          };
        }
        this.socket_.emit('roomMessage', data);
        if (this.repeatSendTimer) {
          $interval.cancel(this.repeatSendTimer);
        }
        // Send data every 15 seconds if the state isn't updated before then
        this.repeatSendTimer = $interval(() => {
          this.socket_.emit('roomMessage', data);
        }, 15000);
      };

      this.release = function() {
        this.socket_.removeListener('roomMessage', handler);
        this.socket_.emit('leaveRoom', {
          room: this.room_
        });
      };

      /**
       * Processes incoming data from remotes into this.cursors and
       * this.selections
       */
      this.updateRemote_ = function(data) {
        var removeEntry = (entry) => {
          this.remoteCurSelsIndex_[entry.emailHash] = null;
          this.remoteCurSels[entry.filePath] =
            _(this.remoteCurSels[entry.filePath]).without(entry);
          $timeout.cancel(entry.expirationTimer_);
        };
        // Remove existsing entries
        var existing = this.remoteCurSelsIndex_[data.eH];
        if (existing) {
          removeEntry(existing);
        }
        var entry = {
          filePath: data.aFP,
          fullName: data.fN,
          emailHash: data.eH,
          cursor: data.cL
        };
        // Check if the data has a selection range
        if (data.sr) {
          entry.selection = new Range(data.sr.sSr, data.sr.sSc,
            data.sr.sEr, data.sr.sEc);
        }
        // Create an experation timer for 20s
        entry.expirationTimer_ = $timeout(() => {
          removeEntry(entry);
        }, 20000);
        // Add the entry to both the index and remoteCurSels
        this.remoteCurSels[entry.filePath] =
          this.remoteCurSels[entry.filePath] || [];
        this.remoteCurSels[entry.filePath].push(entry);
        this.remoteCurSelsIndex_[entry.emailHash] = entry;
      };

      // Join Socket.IO room and watch for changes
      // Have to do this uglyness because I can't use a member function
      var that = this;
      var handler = function(data) {
        $timeout(() => {
          that.updateRemote_(data);
        });
      };
      this.socket_.on('roomMessage', handler);
      this.socket_.emit('joinRoom', {
        room: this.room_
      });

    };
  }
]);
