const { Resolver, lookup } = require("node:dns");
const argv = require("minimist")(process.argv.slice(2));

/**
 * @param -d domain
 */

const domainName = argv["d"];

/**
 * @param -setdns custom dns set
 */

const dnsServer = argv["setdns"];

/**
 * @description check domain validity
 */

const reg = new RegExp("[^a-z0-9-.]", "i");
const isDomainValid = domainName && !reg.test(domainName);

/**
 * @description lookup
 */
if (isDomainValid)
  lookup(domainName, (err, address, family) => {
    console.log("address: %j family: IPv%s", address, family);
  });

if (isDomainValid && dnsServer) {
  const resolver = new Resolver();
  resolver.setServers([dnsServer]);

  resolver.resolve4(domainName, (err, address, family) => {
    console.log("address: %j family: IPv%s", address, family);
  });
}
