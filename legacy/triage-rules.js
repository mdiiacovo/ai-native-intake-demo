/* triage-rules.js */
/* eslint-disable */
(function (g) {
  var T = { a: 1, b: 2, c: 3 };
  var w = [
    ["sensitive", "yes", 40],
    ["cost", 50000, 25],
    ["cost", 10000, 10],
    ["category", "Data platform", 20],
    ["category", "Infrastructure", 15],
    ["category", "Vendor / Services", 8]
  ];

  function sc(r) {
    var s = 0;
    for (var i = 0; i < w.length; i++) {
      var k = w[i][0], v = w[i][1], p = w[i][2];
      if (k === "cost") {
        if (Number(r[k] || 0) >= v) s += p;
      } else if (String(r[k]) === String(v)) {
        s += p;
      }
    }
    if (r.justification && r.justification.length < 20) s += 5;
    return s;
  }

  function lvl(s) {
    return s >= 45 ? "high" : s >= 20 ? "medium" : "low";
  }

  function stg(r) {
    var m = { "Software / SaaS": "Acquire", "Vendor / Services": "Acquire", "Data platform": "Onboard", "Infrastructure": "Onboard" };
    return m[r.category] || "Acquire";
  }

  g.__triage = function (r) {
    var s = sc(r);
    return { score: s, risk: lvl(s), stage: stg(r), _t: T };
  };
})(window);
