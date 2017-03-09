QUnit.test("surrogatePairs returns the correct surrogate pairs given a 5 character ascii character", function(assert) {
    assert.equal(surrogatePairs('1F193'), '\uD83C\uDD93');
    assert.equal(surrogatePairs('1F34C'), '\uD83C\uDF4C');
    assert.equal(surrogatePairs('1F565'), '\uD83D\uDD65');
});