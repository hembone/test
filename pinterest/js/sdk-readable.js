window.PDK || (function(window) {
    function copy(a, b, c, d) {
        for (var e in b)(c || "undefined" == typeof a[e]) && (a[e] = d ? d(b[e]) : b[e]);
        return a
    }

    function create(a, b) {
        for (var c = window.PDK, d = a ? a.split(".") : [], e = d.length, f = 0; e > f; f++) {
            var g = d[f],
                h = c[g];
            h || (h = b && f + 1 == e ? b : {}, c[g] = h), c = h
        }
        return c
    }

    function include(a, b, c) {
        return copy("string" == typeof a ? create(a) : a, b, c)
    }

    function log(a) {
        _logging && window.console && window.console.log(a)
    }

    function guid() {
        return "p" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
    }
    window.PDK = {};
    var document = window.document,
        _appId = null,
        _session = null,
        _logging = !0,
        _domains = {
            api: "https://api.pinterest.com/",
            www: "https://www.pinterest.com/"
        };
    include(PDK, {
        me: function() {
            var a, b = Api.__PREFIX + "me/",
                c = Array.prototype.slice.call(arguments),
                d = c.shift();
            d && "string" == typeof d ? a = d : "function" == typeof d && c.unshift(d), a && (b += 0 === a.indexOf("/") ? a.substr(1) : a), c.unshift(b), PDK.request.apply(void 0, c)
        },
        request: function() {
            var a, b, c, d = Array.prototype.slice.call(arguments),
                e = d.shift(),
                f = d.shift();
            if (!e) return void log("Cannot make a request without specifying a path.");
            for ("/" === e[0] && (e = e.substr(1)), -1 === e.indexOf(Api.__PREFIX) && (e = Api.__PREFIX + e), -1 === e.indexOf("/", e.length - 1) && (e += "/"); f;) {
                var g = typeof f;
                if ("string" !== g || a)
                    if ("function" !== g || c) {
                        if ("object" !== g || b) return void log("Invalid argument passed to api:" + f);
                        b = f
                    } else c = f;
                else a = f.toLowerCase();
                f = d.shift()
            }
            return a = a || "get", b = b || {}, Api.__SUPPORTED_METHODS.indexOf(a) < 0 ? void log("Invalid method passed to api:" + a) : void Api.oauthRequest(e, a, b, c)
        }
    });
    var Api = {
        __SUPPORTED_METHODS: ["get", "post", "delete", "put", "patch"],
        __PREFIX: "v1/",
        __AUTHORIZATION_HEADER: "Authorization",
        triggerRequest: function(a, b, c, d, e, f) {
            var g = f || c;
            window.XMLHttpRequest ? a.open(b, g, !0) : window.XDomainRequest && a.open(b, g), a.setRequestHeader(Api.__AUTHORIZATION_HEADER, "BEARER " + e), a.send(d)
        },
        executeCorsRequest: function(a, b, c, d, e, f, g) {
            var h, i, j = QS.encode(d),
                k = _domains.api + a;
            j && (k += (a.indexOf("?") > -1 ? "&" : "?") + j), window.XMLHttpRequest ? (h = new window.XMLHttpRequest, "withCredentials" in h && (h.onerror = g, h.onreadystatechange = function() {
                4 === h.readyState && (h.status >= 200 && h.status < 400 ? Api.invokeXHRCallback(h, b, k, c, e, f) : (i = h.status, Api.invokeXHRCallback(h, b, k, c, e, f, i)))
            }, Api.triggerRequest(h, b, k, e, c))) : window.XDomainRequest ? (h = new window.XDomainRequest, h.onerror = g, h.onload = function() {
                Api.invokeXHRCallback(h, b, k, c, e, f)
            }, Api.triggerRequest(h, b, k, e, c)) : g(new Error("CORS not supported"))
        },
        invokeXHRCallback: function(a, b, c, d, e, f, g) {
            var h, i, j = {};
            if (f = f || function() {}, g) j.error = "An error occured with status code: " + g;
            else if (a.responseText) try {
                j = JSON.parse(a.responseText) || j, h = j.page, h && h.next && (i = h.next, j.hasNext = !0), j.hasNext && (j.next = function() {
                    Api.triggerRequest(a, b, c, e, d, i)
                })
            } catch (k) {
                j.error = k && k.message
            } else j.error = "The request did not return a valid response";
            "function" == typeof f && f(j)
        },
        oauthRequest: function(a, b, c, d) {
            var e;
            if (c.accessToken ? (e = c.accessToken, delete c.accessToken) : e = Auth.getAccessToken(), !e) return void log("A request was made on behalf of a user before they were authenticated.");
            var f = null;
            c.data && (f = QS.encode(c.data), delete c.data);
            try {
                Api.executeCorsRequest(a, b, e, c, f, d, function(a) {
                    var b = "The request did not complete because of a failure on the network level.";
                    a && a.message && (b = a.message), log(b)
                })
            } catch (g) {
                log("Unable to create the request.")
            }
        }
    };
    include(PDK, {
        login: function(a, b) {
            var c;
            if (a.scope) {
                var d = Auth.getCurrentScope();
                d && !Auth.isNewPermRequested(a.scope, d) && (c = "The current user is already authenticated")
            } else c = "Cannot login without providing scope as an option";
            return c ? void b({
                error: c
            }) : (a = copy({
                method: "auth.login"
            }, a || {}), void UI.createCall(a, b))
        },
        logout: function(a) {
            var b = Auth.setSession(null);
            b.session && (b.error = "The active users session was not cleared."), "function" != typeof a && (a = function() {}), a(b)
        },
        getSession: function() {
            return _session
        },
        setSession: function(a, b) {
            var c;
            a && (c = Auth.setSession(a)), "function" == typeof b && b(c)
        }
    });
    var Auth = {
        _PERMS: ["read_public", "write_public", "read_private", "write_private", "read_relationships", "write_relationships"],
        setSession: function(a) {
            var b = !_session && a,
                c = _session && !a,
                d = b || c || _session && a && _session.accessToken !== a.accessToken,
                e = {
                    session: a
                };
            return _session = a, d && Cookie.isEnabled() && Cookie.set(a), e
        },
        getAccessToken: function() {
            return _session ? _session.accessToken : null
        },
        getCurrentScope: function() {
            return _session ? _session.scope : null
        },
        getUserId: function() {
            var a = _session;
            return a && a.user ? a.user.userId || "" : void 0
        },
        parseScope: function(a) {
            var b = [];
            if (!a) return void log("No permissions specified.");
            for (var c = a.split(","), d = 0; d < c.length; d++) {
                var e = c[d].trim().toLowerCase();
                if (-1 === Auth._PERMS.indexOf(e)) return void log("Unsupported permission: " + c[d] + ".");
                b.push(e)
            }
            return b.join(",")
        },
        isNewPermRequested: function(a, b) {
            if (!b) return !0;
            for (var c = a.split(","), d = 0; d < c.length; d++)
                if (-1 === b.indexOf(c[d])) return !0;
            return !1
        }
    };
    include(PDK, {
        init: function(a) {
            a = copy(a || {}, {
                logging: !0
            }), _appId = a.appId, a.logging || (_logging = !1), _appId && (Cookie.setEnabled(a.cookie), a.session = a.session || Cookie.load(), Auth.setSession(a.session))
        }
    }), window.setTimeout(function() {
        window.pAsyncInit && pAsyncInit()
    }, 0), include(PDK, {
        pin: function(a, b, c, d) {
            var e = {
                method: "pin",
                media: a,
                description: b,
                url: c
            };
            UI.createCall(e, d)
        }
    });
    var UI = {
        Methods: {},
        _active: {},
        _defaultCb: {},
        popupInterval: {},
        createCall: function(a, b) {
            if (!a.method) return void log('"method" is a required parameter for ui call.');
            var c = UI.Methods[a.method.toLowerCase()],
                d = guid();
            if (!c) return void log("Unknown method: " + a.method);
            copy(a, {
                redirect_uri: UI.getRedirectUri()
            });
            var e = {
                cb: b,
                id: d,
                size: c.size || {},
                url: _domains.api + c.url,
                params: a
            };
            if (!c.transform || (e = c.transform(e))) {
                delete e.params.method, e.id in UI._defaultCb || (UI._defaultCb[e.id] = e.cb);
                var f = QS.encode(e.params);
                f && (e.url += "?" + f), UI.popup(e)
            }
        },
        getRedirectUri: function() {
            return window.location.href.split("#")[0]
        },
        popup: function(a) {
            var b, c = "undefined" != typeof window.screenX ? window.screenX : window.screenLeft,
                d = "undefined" != typeof window.screenY ? window.screenY : window.screenTop,
                e = "undefined" != typeof window.outerWidth ? window.outerWidth : document.documentElement.clientWidth,
                f = "undefined" != typeof window.outerHeight ? window.outerHeight : document.documentElement.clientHeight - 22,
                g = a.size.width,
                h = a.size.height,
                i = parseInt(c + (e - g) / 2, 10),
                j = parseInt(d + (f - h) / 2.5, 10),
                k = "width=" + g + ",height=" + h + ",left=" + i + ",top=" + j,
                l = window.location,
                m = !1;
            l && (l = l.origin || l.protocol + "//" + l.host), UI._active[a.id] = {
                win: window.open(a.url, a.id, k),
                useRedirect: a.useRedirect,
                redirect_uri_origin: l
            }, b = function(b) {
                if (!m) {
                    if (b.origin + "/" !== _domains.api) return;
                    UI._active[a.id] && UI._active[a.id].win && UI._active[a.id].win.close(), window.removeEventListener("message", arguments.callee, !1), UI.triggerEvent(a.id, b.data), m = !0
                }
            }, a.useRedirect || window.addEventListener("message", b, !1), a.id in UI._active && UI.monitorPopup()
        },
        triggerEvent: function(a, b) {
            if (!UI._active[a] || !UI._defaultCb[a]) return void log("There was no default callback for this UI method");
            var c = UI._defaultCb[a];
            if (!b) {
                var d = UI._active[a].redirected_uri;
                b = QS.getParamsFromURL(d)
            }
            delete UI._active[a], delete UI._defaultCb[a], c = c || function() {}, "function" == typeof c && c(b)
        },
        monitorPopup: function() {
            var a = !0;
            for (var b in UI._active)
                if (UI._active.hasOwnProperty(b) && b in UI._defaultCb) {
                    var c = UI._active[b],
                        d = c.win,
                        e = d.location;
                    try {
                        d.closed ? (a = !1, UI.triggerEvent(b)) : c.useRedirect && UI.isRedirectedToSameOrigin(e, c.redirect_uri_origin) && (c.redirected_uri = e.href, d.close())
                    } catch (f) {
                        log(f)
                    }
                }
            a && !UI.popupInterval[b] ? UI.popupInterval[b] = window.setInterval(UI.monitorPopup, 100) : !a && UI.popupInterval[b] && (window.clearInterval(UI.popupInterval[b]), UI.popupInterval[b] = null)
        },
        isRedirectedToSameOrigin: function(a, b) {
            try {
                return 0 === a.href.indexOf(b)
            } catch (c) {
                return !1
            }
        }
    };
    UI.Methods = {
        "auth.login": {
            size: {
                width: 627,
                height: 440
            },
            url: "oauth",
            transform: function(a) {
                if (!_appId) return void log("Trying to login before initializing.");
                var b = Auth.parseScope(a.params.scope);
                if (b) return a.useRedirect = !window.postMessage || -1 !== navigator.userAgent.indexOf("MSIE") || navigator.appVersion.indexOf("Trident/") > 0, UI._defaultCb[a.id] = function(c) {
                    var d = {};
                    if (c && c.access_token) {
                        var e = {
                            accessToken: decodeURIComponent(c.access_token),
                            scope: b
                        };
                        d = Auth.setSession(e)
                    }
                    a.cb(d)
                }, copy(a.params, {
                    client_id: _appId,
                    response_type: "token",
                    redirect_type: a.useRedirect ? "uri" : "js",
                    scope: b
                }, !0), a
            }
        },
        pin: {
            size: {
                width: 760,
                height: 565
            },
            url: "pin/create/button",
            transform: function(a) {
                return a.url = _domains.www + this.url, a.useRedirect = !0, a
            }
        }
    };
    var Cookie = {
            _domain: null,
            _enabled: !1,
            setEnabled: function(a) {
                Cookie._enabled = a
            },
            isEnabled: function() {
                return Cookie._enabled
            },
            load: function() {
                var a, b = document.cookie.match("\\bps_" + _appId + '="([^;]*)\\b');
                return b && (a = QS.decode(b[1]), Cookie._domain = a.base_domain), a
            },
            setRaw: function(a, b, c) {
                document.cookie = "ps_" + _appId + '="' + a + '"' + (a && 0 === b ? "" : "; expires=" + new Date(1e3 * b).toGMTString()) + "; path=/" + (c ? "; domain=." + c : ""), Cookie._domain = c
            },
            set: function(a) {
                a ? Cookie.setRaw(QS.encode(a), 0, a.base_domain) : Cookie.clear()
            },
            clear: function() {
                Cookie.setRaw("", 0, Cookie._domain)
            }
        },
        QS = {
            encode: function(a, b, c) {
                b = void 0 === b ? "&" : b, c = c === !1 ? function(a) {
                    return a
                } : encodeURIComponent;
                var d = [];
                for (var e in a) a.hasOwnProperty(e) && (val = a[e], null !== val && "undefined" != typeof val && d.push(c(e) + "=" + c(val)));
                return d.sort(), d.join(b)
            },
            decode: function(a) {
                for (var b, c = decodeURIComponent, d = {}, e = a.split("&"), f = 0; f < e.length; f++) b = e[f].split(/=(.+)?/), b && b[0] && (d[c(b[0])] = c(b[1]));
                return d
            },
            getParamsFromURL: function(a) {
                if (a) {
                    var b = a.split("?")[1];
                    if (b) return QS.decode(b)
                }
            }
        };
})(window);