/**
 * Copyright 2015 Alec Thilenius
 * All rights reserved.
 *
 * Overrides and additions to LoopBack's SourceFile prototype to provide source
 * control for files.
 *
 * Because of LoopBack, this is a thing of beauty, and replaces thousands of
 * lines of C++ code.
 */

var app = angular.module('app');
app.run([
  'SourceFile',
  function(SourceFile) {

    /**
     * Creates an array of patches by diffing the from text to the to text
     */
    var patchesFromStrings = function(from, to) {
      // Need to disable jscs because these arent camelCase
      // jscs:disable
      var dmp = new window.diff_match_patch();
      var dmpDiffs = dmp.diff_main(from, to);
      dmp.diff_cleanupSemantic(dmpDiffs);
      var dmpPatches = dmp.patch_make(dmpDiffs);
      return dmpPatches;
      // jscs:enable
    };

    /**
     * Applies an array of patches to the original text, returning the text
     * after it has been patched
     */
    var applyPatches = function(original, patches) {
      // Need to disable jscs because these arent camelCase
      // jscs:disable
      var dmp = new window.diff_match_patch();
      var dmpPatches = _(patches).map(function(patch) {
        return angular.extend(new diff_match_patch.patch_obj(), patch);
      });
      return dmp.patch_apply(dmpPatches, original)[0];
      // jscs:enable
    };

    /**
     * Creates a single commit from the give text but does not save it or stash
     * it anywhere. It's simply returned
     */
    SourceFile.prototype.createCommit = function(text) {
      var patches = patchesFromStrings(this.checkout(), text);
      if (!patches) {
        return null;
      }
      return {
        timestamp: new Date(),
        patches: patches
      };
    };

    /**
     * Stages and saves a diff of the given text. This can also be used for
     * rollbacks: file.stage(file.checkout(...)); file.commit();
     */
    SourceFile.prototype.stage = function(text) {
      var commit = this.createCommit(text);
      if (commit) {
        this.stagedCommit = commit;
        // Save just the staged commit
        SourceFile.prototype$updateAttributes({
          id: this.id
        }, {
          stagedCommit: this.stagedCommit
        });
      }
    };

    /**
     * Commits the staged changes to the diff list (cementing them in history
     * forever). If no changes are staged then this has ne effect.
     */
    SourceFile.prototype.commit = function() {
      if (!this.stagedCommit) {
        return;
      }
      this.commits = this.commits || [];
      this.commits.push(this.stagedCommit);
      this.stagedCommit = null;
      SourceFile.prototype$updateAttributes({
        id: this.id
      }, {
        stagedCommit: null,
        commits: this.commits
      });
    };

    /**
     * Builds text up until and including the given timestamp. If no timestamp
     * is given that it will build to head including the staged commit
     */
    SourceFile.prototype.checkout = function(timestamp) {
      // Always bring cache back to HEAD minus stage
      var ephemeral = this.links.ephemeral;
      ephemeral.lcText = ephemeral.lcText || '';
      _.chain(this.commits).filter(function(commit) {
        return !ephemeral.lcTimestamp || new Date(commit.timestamp) >
          ephemeral.lcTimestamp;
      }).each(function(commit) {
        ephemeral.lcText = applyPatches(ephemeral.lcText, commit.patches);
        ephemeral.lcTimestamp = new Date(commit.timestamp);
      });
      if (!timestamp || new Date(timestamp) >= new Date()) {
        // Shortcut building the diffs from BASE if HEAD is wanted
        if (this.stagedCommit) {
          return applyPatches(ephemeral.lcText, this.stagedCommit.patches);
        } else {
          return ephemeral.lcText;
        }
      } else {
        timestamp = new Date(timestamp);
        var text = '';
        _.chain(this.commits).filter(function(commit) {
          return new Date(commit.timestamp) <= timestamp;
        }).each(function(commit) {
          text = applyPatches(text, commit.patches);
        });
        if (this.stagedCommit && new Date(this.stagedCommit.timestamp) <=
          timestamp) {
          text = applyPatches(text, stagedCommit.patches);
        }
        return text;
      }
    };
  }
]);
