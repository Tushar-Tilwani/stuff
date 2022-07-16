const { useState, useEffect } = require("react");

function useFetch(url) {
  // Write your code here.
  const [isLoading, setIsLoading] = useState(false);
  const [responseJSON, setResponseJSON] = useState(null);
  const [error, setError] = useState(null);
  let shouldCancel = false;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (shouldCancel) {
          return;
        }
        setResponseJSON(json);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      shouldCancel = true;
    };
  }, [url, setIsLoading, setError, setResponseJSON]);
  return { isLoading, responseJSON, error };
}

// Do not edit the line below.
exports.useFetch = useFetch;
