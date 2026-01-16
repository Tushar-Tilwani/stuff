(() => {
  "use strict";
  const e = {
      unstructured: { message: "string" },
      event: { kind: "string", detail: "string" },
      exception: {
        "exception.type": "string",
        "exception.message": "string",
        "exception.stacktrace": "string",
        "exception.url": "string",
      },
    },
    t = JSON.parse(
      '{"logs":"https://ir.ebaystatic.com/cr/v/c01/logs.b053237932e2cbe51bee.bundle.js","metrics":"https://ir.ebaystatic.com/cr/v/c01/metrics.b053237932e2cbe51bee.bundle.js"}'
    );
  const r = async (e) => {
      let r = 2;
      const n = async () => {
        let o;
        r--;
        try {
          o = await import(t[e]);
        } catch (e) {
          if (r > 0)
            return (
              console.error(
                "@ebay/rum-web failed to lazy load module; retrying",
                e
              ),
              n()
            );
          throw (
            (console.error(
              "@ebay/rum-web failed to lazy load module; fatal",
              e
            ),
            e)
          );
        }
        return (
          (function (e, t) {
            if (
              "object" != typeof (r = e) ||
              null === r ||
              Array.isArray(r) ||
              e.key !== t ||
              void 0 === e.factory
            )
              throw new Error("Invalid module loaded");
            var r;
          })(o, e),
          o
        );
      };
      return n();
    },
    n = (e, t) => {
      const r =
        "undefined" != typeof window ? window.location.href : "/index.js";
      return {
        type: "exception",
        "exception.context": t || "",
        "exception.type": e?.name || "",
        "exception.message": e?.message || "",
        "exception.stacktrace": e?.stack || "",
        "exception.url": r,
      };
    },
    o = (e, t, n) => {
      let o = !1;
      const i = [];
      let a = (e) => {
        o
          ? ((e) => {
              console.warn(
                "Logger failed initialization (see earlier error logs) — failed to send log: ",
                e
              );
            })(e)
          : i.push(e);
      };
      return (
        n({ event: "Preload", value: a }),
        r("logs")
          .then((r) => {
            const { factory: n } = r;
            return n(e, t);
          })
          .then((e) => {
            (a = e),
              n({ event: "Complete", value: a }),
              i.forEach((e) => a(e)),
              (i.length = 0);
          })
          .catch((e) => {
            console.error(e.message),
              (o = !0),
              n({ event: "Error", value: e }),
              i.forEach((e) => a(e)),
              (i.length = 0);
          }),
        (t) => {
          ((e, t) =>
            "shouldIgnore" in e && void 0 !== e.shouldIgnore
              ? e.shouldIgnore(t)
              : "ignoreList" in e &&
                void 0 !== e.ignoreList &&
                ((e, t) =>
                  null !== Object.values(e).filter(Boolean).join(" ").match(t))(
                  t,
                  e.ignoreList
                ))(e, t) || a(t);
        }
      );
    },
    i = (e) => ({
      log: (t) => e({ type: "unstructured", message: t }),
      error: (t, r) => e(n(t, r)),
      event: (t) => e(t),
    }),
    a = "@ebay/rum/request-status",
    s = Symbol.for("@ebay/rum/logger"),
    c = (e) => {
      window.dispatchEvent(
        new CustomEvent("@ebay/rum/ack-status", { detail: e })
      );
    };
  function l(e, t) {
    !1 === e && new Error(`RUM_INLINE_ERR_CODE: ${t}`);
  }
  ((t) => {
    const l = (() => {
      let e = { status: "Initialize" };
      const t = () => c(e);
      return (
        window.addEventListener(a, t),
        {
          updateInlinerState: (t) => {
            (e = t), c(e);
          },
          dispose: () => window.removeEventListener(a, t),
        }
      );
    })();
    try {
      const a = ((t, r = () => {}) => {
        if (
          (((e) => {
            if (!e.endpoint)
              throw new Error(
                'Unable to initialize logger. "endpoint" is a required property in the input object.'
              );
            if (!e.serviceName)
              throw new Error(
                'Unable to initialize logger. "serviceName" is a required property in the input object.'
              );
            if (e.customSchemas && !e.namespace)
              throw new Error(
                'Unable to initialize logger. "namespace" is a required property in the input object if you provide customeSchemas.'
              );
          })(t),
          "undefined" == typeof window)
        )
          return { ...i(() => {}), noop: !0 };
        const a = { ...t.customSchemas, ...e },
          s = o(
            ((e) => {
              return "ignoreList" in e
                ? {
                    ...e,
                    ignoreList:
                      ((t = e.ignoreList),
                      new RegExp(t.map((e) => `(${e})`).join("|"), "g")),
                  }
                : e;
              var t;
            })(t),
            a,
            r
          );
        return (
          t.captureUncaught &&
            ((e) => {
              window.addEventListener("error", (t) => {
                if (t.error instanceof Error) {
                  const r = n(t.error, "Uncaught Error Handler");
                  e(r);
                }
              });
            })(s),
          t.captureUnhandledRejections &&
            ((e) => {
              window.addEventListener("unhandledrejection", (t) => {
                if (t.reason instanceof Error) {
                  const r = n(t.reason, "Unhandled Rejection Handler");
                  e(r);
                }
              });
            })(s),
          i(s)
        );
      })(
        t.loggerProps,
        ((e) => (t) => {
          if ("Error" === t.event)
            return ((e, t) => {
              e.updateInlinerState({ status: "Failure", error: t.value });
            })(e, t);
          var r;
          e.updateInlinerState({
            status: ((r = t.event), "Complete" === r ? "Success" : r),
            logger: i(t.value),
          });
        })(l)
      );
      t.onLoggerLoad && t.onLoggerLoad(a),
        (window[s] = a),
        ((e) => {
          const t = e.options?.enableWebVitals;
          t &&
            (async (e) => {
              try {
                const t = await r("metrics"),
                  { factory: n } = t,
                  { initializeWebVitals: o, initializeMeter: i } = n,
                  { meter: a, flushAndShutdownOnce: s } = i(e);
                return (
                  e.options?.enableWebVitals && o(a),
                  { meter: a, flushAndShutdownOnce: s }
                );
              } catch (e) {
                return (
                  console.error(
                    "[initializeMeterAsync] Failed to initialize metrics:",
                    e
                  ),
                  null
                );
              }
            })({ ...e.loggerProps, options: { enableWebVitals: t } });
        })(t);
    } catch (e) {
      l.updateInlinerState({ status: "Failure", error: e });
    }
  })({
    onLoggerLoad: () => {},
    ...(() => {
      l(null !== document.currentScript, 1);
      const e = document.currentScript.dataset.inlinepayload;
      return l(void 0 !== e, 2), JSON.parse(e);
    })(),
  });
})();
