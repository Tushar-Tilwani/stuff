/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
  const domainMap = cpdomains.reduce((domainMap, cpdomain) => {
    const [count, domain] = cpdomain.split(" ");
    const subDomains = domain.split(".");
    for (let i = 0; i < subDomains.length; i++) {
      const subDomain = subDomains.slice(i).join(".");
      domainMap.set(
        subDomain,
        (domainMap.get(subDomain) ?? 0) + parseInt(count)
      );
    }
    return domainMap;
  }, new Map());

  return Array.from(domainMap.entries()).map((entry) => entry.join(" "));
};
