// Copyright 2015 Alec Thilenius
// All rights reserved.

var Differencer = function () {
    this.dmp = new diff_match_patch();
};

Differencer.prototype.patchesFromStrings = function (from, to) {
    var dmpDiffs = this.dmp.diff_main(from, to);
    this.dmp.diff_cleanupSemantic(dmpDiffs);
    var dmpPatches = this.dmp.patch_make(dmpDiffs);
    var patches = [];
    for (var i = 0; i < dmpPatches.length; i++) {
        var dmpPatch = dmpPatches[i];
        var patch = new Patch();
        patch.diffs = [];
        patch.from_span = new Span();
        patch.from_span.from = dmpPatch.start1;
        patch.from_span.length = dmpPatch.length1;
        patch.to_span = new Span();
        patch.to_span.from = dmpPatch.start2;
        patch.to_span.length = dmpPatch.length2;
        for (var j = 0; j < dmpPatch.diffs.length; j++) {
            var dmpDiff = dmpPatch.diffs[j];
            var diff = new Diff();
            if (dmpDiff[0] == DIFF_INSERT) {
                diff.diff_type = DIFF_TYPE_INSERT;
            } else if (dmpDiff[0] == DIFF_DELETE) {
                diff.diff_type = DIFF_TYPE_DELETE;
            } else if (dmpDiff[0] == DIFF_EQUAL) {
                diff.diff_type = DIFF_TYPE_EQUAL;
            }
            diff.text = dmpDiff[1];
            patch.diffs.push(diff);
        }
        patches.push(patch);
    }
    return patches;
};

Differencer.prototype.applyPatches = function (original, patches) {
    var dmpPatches = [];
    for (var i = 0; i < patches.length; i++) {
        var patch = patches[i];
        var dmpPatch = new diff_match_patch.patch_obj();
        dmpPatch.start1 = patch.from_span.from;
        dmpPatch.length1 = patch.from_span.length;
        dmpPatch.start2 = patch.to_span.from;
        dmpPatch.length2 = patch.to_span.length;
        for (var j = 0; j < patch.diffs.length; j++) {
            var diff = patch.diffs[j];
            if (diff.diff_type == DIFF_TYPE_INSERT) {
                dmpPatch.diffs.push([DIFF_INSERT, diff.text]);
            } else if (diff.diff_type == DIFF_TYPE_DELETE) {
                dmpPatch.diffs.push([DIFF_DELETE, diff.text]);
            } else if (diff.diff_type == DIFF_TYPE_EQUAL) {
                dmpPatch.diffs.push([DIFF_EQUAL, diff.text]);
            }
        }
        dmpPatches.push(dmpPatch);
    }
    return this.dmp.patch_apply(dmpPatches, original)[0];
};
