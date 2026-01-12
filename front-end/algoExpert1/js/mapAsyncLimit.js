/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
export default async function mapAsyncLimit(iterable, callbackFn, size) {
  const finalSize = Number.isFinite(size) ? Math.min(size, iterable.length) : iterable.length;
  let current = 0;
  const results = [];
  const runTask = async () => {
    while (true) {
      if (current >= iterable.length) {
        return;
      }
      const next = current++;
      results[next] = await callbackFn(iterable[next]);
    }
  };
  const workers = [];
  for (let i = 0; i < finalSize; i++) {
    workers.push(runTask());
  }
  await Promise.all(workers);
  return results;
}
