// https://leetcode.com/problems/subdomain-visit-count/
/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
  const map = new Map();
  for (const cpdomain of cpdomains) {
    const [count, domain] = cpdomain.split(" ");
    addToMap(map, domain, parseInt(count));
  }

  const result = Array.from(map.entries()).map(([domain, count]) =>
    [count, domain].join(" ")
  );

  return result;
};

/**
 * @param {map} map
 * @param {string[]} domain
 * @param {number} count
 * @return {string[]}
 */
function addToMap(map, domainStr, count) {
  const domain = domainStr.split(".");
  const length = domain.length - 1;
  for (let i = length; i >= 0; i--) {
    const subDomain = domain.slice(i).join(".");
    if (map.has(subDomain)) {
      map.set(subDomain, map.get(subDomain) + count);
    } else {
      map.set(subDomain, count);
    }
  }
  return map;
}

let cpdomains = ["9001 discuss.leetcode.com"];
cpdomains = [
  "900 google.mail.com",
  "50 yahoo.com",
  "1 intel.mail.com",
  "5 wiki.org",
];
console.log(subdomainVisits(cpdomains));
