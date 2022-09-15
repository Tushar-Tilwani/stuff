const FIXED_HASH = 23;

function consitentHashing() {
  const servers = [
    getRandom(0, 100000000),
    getRandom(0, 100000000),
    getRandom(0, 100000000),
  ].sort((a, b) => (a % FIXED_HASH) - (b % FIXED_HASH));

  const requestId = getRandom(0, 100000000);

  const serverHashes = servers.map((s) => s % FIXED_HASH);

  const requestHash = requestId % FIXED_HASH;

  console.log(`Servers are ${servers}. ServerHashes are ${serverHashes}`);

  const serverIndex = getServerIndex(serverHashes, requestHash);

  console.log(
    `Request Id ${requestId} hashed as ${requestHash} goes to ${servers[serverIndex]} hashed as ${serverHashes[serverIndex]}`
  );
}

function getServerIndex(serverHashes, requestHash) {
  const end = serverHashes.length - 1;
  if (requestHash < serverHashes[0]) {
    return end;
  }

  if (requestHash > serverHashes[end]) {
    return 0;
  }

  return serverHashes.findIndex((serverHash) => serverHash < requestHash);
}

function getRandom(min, max) {
  return Math.floor((max - min) * Math.random()) + min;
}

consitentHashing();
