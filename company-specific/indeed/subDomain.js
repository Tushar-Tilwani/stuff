/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function(cpdomains) {
  const domainMap = {};

  for (let value of cpdomains) {
    const [visitedStr, domain] = value.split(" ");
    const vistedNum = parseInt(visitedStr);
    const domains = domain.split(".");
    const lastIndex = domains.length - 1;
    let subDomain = "";

    for (let i = lastIndex; i >= 0; i--) {
      if (!subDomain) {
        subDomain = domains[i];
      } else {
        subDomain = domains[i] + "." + subDomain;
      }

      domainMap[subDomain] = domainMap[subDomain] + vistedNum || vistedNum;
    }
  }
  return Object.entries(domainMap).map(g => g.reverse().join(" "));
};
