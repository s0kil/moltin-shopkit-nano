
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var fastdom = createCommonjsModule(function (module) {
	!(function(win) {

	/**
	 * Mini logger
	 *
	 * @return {Function}
	 */
	var debug = function() {};

	/**
	 * Normalized rAF
	 *
	 * @type {Function}
	 */
	var raf = win.requestAnimationFrame
	  || win.webkitRequestAnimationFrame
	  || win.mozRequestAnimationFrame
	  || win.msRequestAnimationFrame
	  || function(cb) { return setTimeout(cb, 16); };

	/**
	 * Initialize a `FastDom`.
	 *
	 * @constructor
	 */
	function FastDom() {
	  var self = this;
	  self.reads = [];
	  self.writes = [];
	  self.raf = raf.bind(win); // test hook
	}

	FastDom.prototype = {
	  constructor: FastDom,

	  /**
	   * Adds a job to the read batch and
	   * schedules a new frame if need be.
	   *
	   * @param  {Function} fn
	   * @param  {Object} ctx the context to be bound to `fn` (optional).
	   * @public
	   */
	  measure: function(fn, ctx) {
	    var task = !ctx ? fn : fn.bind(ctx);
	    this.reads.push(task);
	    scheduleFlush(this);
	    return task;
	  },

	  /**
	   * Adds a job to the
	   * write batch and schedules
	   * a new frame if need be.
	   *
	   * @param  {Function} fn
	   * @param  {Object} ctx the context to be bound to `fn` (optional).
	   * @public
	   */
	  mutate: function(fn, ctx) {
	    var task = !ctx ? fn : fn.bind(ctx);
	    this.writes.push(task);
	    scheduleFlush(this);
	    return task;
	  },

	  /**
	   * Clears a scheduled 'read' or 'write' task.
	   *
	   * @param {Object} task
	   * @return {Boolean} success
	   * @public
	   */
	  clear: function(task) {
	    return remove(this.reads, task) || remove(this.writes, task);
	  },

	  /**
	   * Extend this FastDom with some
	   * custom functionality.
	   *
	   * Because fastdom must *always* be a
	   * singleton, we're actually extending
	   * the fastdom instance. This means tasks
	   * scheduled by an extension still enter
	   * fastdom's global task queue.
	   *
	   * The 'super' instance can be accessed
	   * from `this.fastdom`.
	   *
	   * @example
	   *
	   * var myFastdom = fastdom.extend({
	   *   initialize: function() {
	   *     // runs on creation
	   *   },
	   *
	   *   // override a method
	   *   measure: function(fn) {
	   *     // do extra stuff ...
	   *
	   *     // then call the original
	   *     return this.fastdom.measure(fn);
	   *   },
	   *
	   *   ...
	   * });
	   *
	   * @param  {Object} props  properties to mixin
	   * @return {FastDom}
	   */
	  extend: function(props) {
	    if (typeof props != 'object') throw new Error('expected object');

	    var child = Object.create(this);
	    mixin(child, props);
	    child.fastdom = this;

	    // run optional creation hook
	    if (child.initialize) child.initialize();

	    return child;
	  },

	  // override this with a function
	  // to prevent Errors in console
	  // when tasks throw
	  catch: null
	};

	/**
	 * Schedules a new read/write
	 * batch if one isn't pending.
	 *
	 * @private
	 */
	function scheduleFlush(fastdom) {
	  if (!fastdom.scheduled) {
	    fastdom.scheduled = true;
	    fastdom.raf(flush.bind(null, fastdom));
	  }
	}

	/**
	 * Runs queued `read` and `write` tasks.
	 *
	 * Errors are caught and thrown by default.
	 * If a `.catch` function has been defined
	 * it is called instead.
	 *
	 * @private
	 */
	function flush(fastdom) {

	  var writes = fastdom.writes;
	  var reads = fastdom.reads;
	  var error;

	  try {
	    debug('flushing reads', reads.length);
	    runTasks(reads);
	    debug('flushing writes', writes.length);
	    runTasks(writes);
	  } catch (e) { error = e; }

	  fastdom.scheduled = false;

	  // If the batch errored we may still have tasks queued
	  if (reads.length || writes.length) scheduleFlush(fastdom);

	  if (error) {
	    debug('task errored', error.message);
	    if (fastdom.catch) fastdom.catch(error);
	    else throw error;
	  }
	}

	/**
	 * We run this inside a try catch
	 * so that if any jobs error, we
	 * are able to recover and continue
	 * to flush the batch until it's empty.
	 *
	 * @private
	 */
	function runTasks(tasks) {
	  var task; while (task = tasks.shift()) task();
	}

	/**
	 * Remove an item from an Array.
	 *
	 * @param  {Array} array
	 * @param  {*} item
	 * @return {Boolean}
	 */
	function remove(array, item) {
	  var index = array.indexOf(item);
	  return !!~index && !!array.splice(index, 1);
	}

	/**
	 * Mixin own properties of source
	 * object into the target.
	 *
	 * @param  {Object} target
	 * @param  {Object} source
	 */
	function mixin(target, source) {
	  for (var key in source) {
	    if (source.hasOwnProperty(key)) target[key] = source[key];
	  }
	}

	// There should never be more than
	// one instance of `FastDom` in an app
	var exports = win.fastdom = (win.fastdom || new FastDom()); // jshint ignore:line

	// Expose to CJS & AMD
	module.exports = exports;

	})( typeof window !== 'undefined' ? window : commonjsGlobal);
	});

	/* eslint no-void: "off" */

	// Loaded ready states
	var loadedStates = ['interactive', 'complete'];

	// Return Promise
	var whenDomReady = function whenDomReady(cb, doc) {
		return new Promise(function (resolve) {
			// Allow doc to be passed in as the lone first param
			if (cb && typeof cb !== 'function') {
				doc = cb;
				cb = null;
			}

			// Use global document if we don't have one
			doc = doc || window.document;

			// Handle DOM load
			var done = function done() {
				return resolve(void (cb && setTimeout(cb)));
			};

			// Resolve now if DOM has already loaded
			// Otherwise wait for DOMContentLoaded
			if (loadedStates.indexOf(doc.readyState) !== -1) {
				done();
			} else {
				doc.addEventListener('DOMContentLoaded', done);
			}
		});
	};

	// Promise chain helper
	whenDomReady.resume = function (doc) {
		return function (val) {
			return whenDomReady(doc).then(function () {
				return val;
			});
		};
	};
	//# sourceMappingURL=index.es2015.js.map

	const nativeToSyntheticEvent = (event, name) => {
	    const eventKey = `__${name}`;
	    let dom = event.target;
	    while(dom !== null) {
	        const eventHandler = dom[eventKey];
	        if (eventHandler) {
	            eventHandler(event);
	            return
	        }
	        dom = dom.parentNode;
	    }
	};
	const CONFIGURED_SYNTHETIC_EVENTS = {};
	function setupSyntheticEvent(name) {
	    if (CONFIGURED_SYNTHETIC_EVENTS[name]) return
	    document.addEventListener(name, event => nativeToSyntheticEvent(event, name));
	    CONFIGURED_SYNTHETIC_EVENTS[name] = true;
	}

	var fastdomPromised = createCommonjsModule(function (module) {
	!(function() {

	/**
	 * Wraps fastdom in a Promise API
	 * for improved control-flow.
	 *
	 * @example
	 *
	 * // returning a result
	 * fastdom.measure(() => el.clientWidth)
	 *   .then(result => ...);
	 *
	 * // returning promises from tasks
	 * fastdom.measure(() => {
	 *   var w = el1.clientWidth;
	 *   return fastdom.mutate(() => el2.style.width = w + 'px');
	 * }).then(() => console.log('all done'));
	 *
	 * // clearing pending tasks
	 * var promise = fastdom.measure(...)
	 * fastdom.clear(promise);
	 *
	 * @type {Object}
	 */
	var exports = {
	  initialize: function() {
	    this._tasks = new Map();
	  },

	  mutate: function(fn, ctx) {
	    return create(this, 'mutate', fn, ctx);
	  },

	  measure: function(fn, ctx) {
	    return create(this, 'measure', fn, ctx);
	  },

	  clear: function(promise) {
	    var tasks = this._tasks;
	    var task = tasks.get(promise);
	    this.fastdom.clear(task);
	    tasks.delete(promise);
	  }
	};

	/**
	 * Create a fastdom task wrapped in
	 * a 'cancellable' Promise.
	 *
	 * @param  {FastDom}  fastdom
	 * @param  {String}   type - 'measure'|'muatate'
	 * @param  {Function} fn
	 * @return {Promise}
	 */
	function create(promised, type, fn, ctx) {
	  var tasks = promised._tasks;
	  var fastdom = promised.fastdom;
	  var task;

	  var promise = new Promise(function(resolve, reject) {
	    task = fastdom[type](function() {
	      tasks.delete(promise);
	      try { resolve(ctx ? fn.call(ctx) : fn()); }
	      catch (e) { reject(e); }
	    }, ctx);
	  });

	  tasks.set(promise, task);
	  return promise;
	}

	// Expose to CJS, AMD or global
	if ((typeof undefined)[0] == 'f') undefined(function() { return exports; });
	else if (('object')[0] == 'o') module.exports = exports;
	else window.fastdomPromised = exports;

	})();
	});

	const pluralize = (count, noun, suffix = "s") =>
	  `${count} ${noun}${count !== 1 ? suffix : ""}`;

	// Special Thanks To: https://gist.github.com/KoryNunn/5488215
	function inEach(items, callback) {
	  for (
	    let i = 0, count = items.length;
	    i < count && !callback(items[i], i, items);
	    i++
	  ) {}
	  return items;
	}

	const storage = new Map();
	const storageAdapter = {
	  set: (key, value) => {
	    storage.set(key, value);
	  },

	  get: key => {
	    if (!storage.has(key)) {
	      return JSON.stringify({});
	    } else {
	      return storage.get(key);
	    }
	  },

	  delete: key => {
	    return storage.delete(key);
	  }
	};

	async function authenticator() {
	  const {
	    client_id,
	    client_secret,
	    storage,
	    options: { host }
	  } = this;

	  if (!client_id) {
	    throw new Error("You must provide a client_id");
	  }

	  const uri = `https://${host}/oauth/access_token`;

	  const body = {
	    grant_type: client_secret ? "client_credentials" : "implicit",
	    client_id,
	    ...(client_secret && { client_secret })
	  };

	  const response = await this.fetch(uri, {
	    method: "POST",
	    headers: {
	      "Content-Type": "application/x-www-form-urlencoded",
	      "X-MOLTIN-SDK-LANGUAGE": "JS-REQUEST"
	    },
	    body: Object.keys(body)
	      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
	      .join("&")
	  });

	  const { access_token, expires } = await response.json();

	  if (!access_token) {
	    throw new Error("Unable to obtain an access token");
	  }

	  if (storage) {
	    const credentials = {
	      client_id,
	      access_token,
	      expires
	    };

	    await storage.set("moltinCredentials", JSON.stringify(credentials));
	  }

	  return access_token;
	}

	function createCartIdentifier() {
	  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
	    ((Math.random() * 16) | 0).toString(16)
	  );
	}

	function removeLeadingSlash(string) {
	  return string.replace(/^\/+/, "");
	}

	async function requestHandler(
	  method,
	  path,
	  data,
	  requestHeaders
	) {
	  const {
	    client_id,
	    storage,
	    options: {
	      application,
	      currency,
	      customer_token,
	      host,
	      version,
	      headers: classHeaders
	    }
	  } = this;

	  const uri = `https://${host}/${version}/${removeLeadingSlash(path)}`;

	  const customHeaders = {
	    ...classHeaders,
	    ...requestHeaders
	  };

	  let credentials, access_token;

	  if (storage) {
	    credentials = await JSON.parse(storage.get("moltinCredentials"));
	  }

	  access_token =
	    !credentials ||
	    !credentials.access_token ||
	    credentials.client_id !== client_id ||
	    Math.floor(Date.now() / 1000) >= credentials.expires
	      ? await this.authenticate()
	      : credentials.access_token;

	  const headers = {
	    "Content-Type": "application/json",
	    "X-MOLTIN-SDK-LANGUAGE": "JS-REQUEST",
	    Authorization: `Bearer ${access_token}`,
	    ...(application && { "X-MOLTIN-APPLICATION": application }),
	    ...(currency && { "X-MOLTIN-CURRENCY": currency }),
	    ...(customer_token && { "X-MOLTIN-CUSTOMER-TOKEN": customer_token }),
	    ...customHeaders
	  };

	  const body = customHeaders["Content-Type"]
	    ? data
	    : { body: JSON.stringify({ data }) };

	  const response = await this.fetch(uri, {
	    method,
	    headers,
	    ...(data && body)
	  });

	  if (response.status === 204) return response.text();

	  const json = await response.json();

	  if (!response.ok) {
	    throw {
	      statusCode: response.status,
	      ...json
	    };
	  }

	  return json;
	}

	function MoltinClient(options) {
	  const { client_id, client_secret, storage, ...others } = options;

	  this.client_id = client_id;
	  this.client_secret = client_secret ? client_secret : undefined;
	  this.storage = storage ? storage : storageAdapter;
	  this.fetch = options.fetch ? options.fetch : fetch;
	  this.options = {
	    host: options.host ? options.host : "api.moltin.com",
	    version: options.version ? options.version : "v2",
	    ...others
	  };
	}

	MoltinClient.prototype.authenticate = authenticator;

	MoltinClient.prototype.request = requestHandler;

	MoltinClient.prototype.get = function(path, headers) {
	  return this.request("GET", path, undefined, headers);
	};

	MoltinClient.prototype.put = function(path, data, headers) {
	  return this.request("PUT", path, data, headers);
	};

	MoltinClient.prototype.post = function(path, data, headers) {
	  return this.request("POST", path, data, headers);
	};

	MoltinClient.prototype.delete = function(path, data, headers) {
	  return this.request("DELETE", path, data, headers);
	};

	let moltinApi;
	function setApiHandler(moltinClient) {
	  moltinApi = moltinClient;
	  moltinApi.debounce = false;
	}

	let controller, signal;
	function fetchController(uri, options) {
	  if (moltinApi.debounce && controller !== undefined) controller.abort(); // Cancel The Previous Request
	  if (AbortController) {
	    controller = new AbortController();
	    signal = controller.signal;
	  }

	  const { body, method, headers } = options;

	  return fetch(uri, {
	    signal,
	    method,
	    headers,
	    body
	  });
	}

	function collector(node) {
	  if (node.nodeType !== 3) {
	    if (node.attributes !== undefined) {
	      for(let attr of Array.from(node.attributes)) {
	        let aname = attr.name;
	        if (aname[0] === '#') {
	          node.removeAttribute(aname);
	          return aname.slice(1)
	        }
	      }
	    }
	    return 0
	  } else {
	    let nodeData = node.nodeValue;
	    if (nodeData[0] === '#') {
	      node.nodeValue = "";
	      return nodeData.slice(1)
	    }
	    return 0
	  }
	}

	const TREE_WALKER = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
	TREE_WALKER.roll = function(n) {
	  while(--n) this.nextNode();
	  return this.currentNode
	};

	class Ref {
	  constructor(idx, ref) {
	    this.idx = idx;
	    this.ref = ref;
	  }
	}

	function genPath(node) {
	  const w = TREE_WALKER;
	  w.currentNode = node;

	  let indices = [], ref, idx = 0;
	  do {
	    if (ref = collector(node)) {
	      indices.push(new Ref(idx+1, ref));
	      idx = 1;
	    } else {
	      idx++;
	    }
	  } while(node = w.nextNode())

	  return indices
	}

	function walker(node) {
	  const refs = {};

	  const w = TREE_WALKER;
	  w.currentNode = node;

	  this._refPaths.map(x => refs[x.ref] = w.roll(x.idx));

	  return refs
	}

	function compile(node) {
	    node._refPaths = genPath(node);
	    node.collect = walker;
	}

	const compilerTemplate = document.createElement('template');
	function h(strings, ...args) {
	  const template = String.raw(strings, ...args)
	    .replace(/>\n+/g, '>')
	    .replace(/\s+</g, '<')
	    .replace(/>\s+/g, '>')
	    .replace(/\n\s+/g, '<!-- -->');
	  compilerTemplate.innerHTML = template;
	  const content = compilerTemplate.content.firstChild;
	  compile(content);
	  return content
	}

	//      
	// An event handler can take an optional event argument
	// and should not return a value
	                                          
	                                                               

	// An array of all currently registered event handlers for a type
	                                            
	                                                            
	// A map of event types and their corresponding event handlers.
	                        
	                                 
	                                   
	  

	/** Mitt: Tiny (~200b) functional event emitter / pubsub.
	 *  @name mitt
	 *  @returns {Mitt}
	 */
	function mitt(all                 ) {
		all = all || Object.create(null);

		return {
			/**
			 * Register an event handler for the given type.
			 *
			 * @param  {String} type	Type of event to listen for, or `"*"` for all events
			 * @param  {Function} handler Function to call in response to given event
			 * @memberOf mitt
			 */
			on: function on(type        , handler              ) {
				(all[type] || (all[type] = [])).push(handler);
			},

			/**
			 * Remove an event handler for the given type.
			 *
			 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
			 * @param  {Function} handler Handler function to remove
			 * @memberOf mitt
			 */
			off: function off(type        , handler              ) {
				if (all[type]) {
					all[type].splice(all[type].indexOf(handler) >>> 0, 1);
				}
			},

			/**
			 * Invoke all handlers for the given type.
			 * If present, `"*"` handlers are invoked after type-matched handlers.
			 *
			 * @param {String} type  The event type to invoke
			 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
			 * @memberOf mitt
			 */
			emit: function emit(type        , evt     ) {
				(all[type] || []).slice().map(function (handler) { handler(evt); });
				(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
			}
		};
	}
	//# sourceMappingURL=mitt.es.js.map

	/**
	 * Initialize new store and apply all modules to the store.
	 *
	 * @param {moduleInitializer[]} modules Functions which will set initial state
	 *                                      define reducer and subscribe
	 *                                      to all system events.
	 *
	 * @return {Store} The new store.
	 *
	 * @example
	 * import createStore from 'storeon'
	 * let increment = store => {
	 *   store.on('@init', () => ({ count: 0 }))
	 *   store.on('inc', ({ count }) => ({ count: count + 1 }))
	 * }
	 * const store = createStore([increment])
	 * store.get().count //=> 0
	 * store.dispatch('inc')
	 * store.get().count //=> 1
	 */
	var createStore = function (modules) {
	  var events = { };
	  var state = { };

	  var on = function (event, cb) {
	    (events[event] || (events[event] = [])).push(cb);

	    return function () {
	      events[event] = events[event].filter(function (i) {
	        return i !== cb
	      });
	    }
	  };

	  var dispatch = function (event, data) {
	    if (event !== '@dispatch') {
	      dispatch('@dispatch', [event, data, events[event]]);
	    }

	    if (events[event]) {
	      var changes = { };
	      var changed;
	      events[event].forEach(function (i) {
	        var diff = i(state, data);
	        if (diff && typeof diff.then !== 'function') {
	          changed = Object.assign({ }, state, diff);
	          Object.assign(changes, diff);
	          state = changed;
	        }
	      });
	      if (changed) dispatch('@changed', changes);
	    }
	  };

	  var get = function () {
	    return state
	  };

	  var store = { dispatch: dispatch, get: get, on: on };

	  modules.forEach(function (i) {
	    if (i) i(store);
	  });
	  dispatch('@init');

	  return store
	};

	var storeon = createStore;

	/**
	 * Storeon module to persist state to local storage
	 *
	 * @param {String[]} paths The keys of state object
	 *    that will be store in local storage
	 * @param {Object} config The config object
	 * @param {String} [config.key='storeon'] The default key
	 *    to use in local storage
	 */
	var persistState = function (paths, config) {
	  config = config || { };
	  paths = paths || [];

	  var key = config.key || 'storeon';

	  return function (store) {
	    store.on('@init', function () {
	      try {
	        var savedState = localStorage.getItem(key);
	        if (savedState !== null) {
	          return JSON.parse(savedState)
	        }
	      } catch (err) { }
	    });
	    store.on('@dispatch', function (state, data) {
	      var event = data[0];
	      if (event === '@init') {
	        return
	      }

	      var stateToStore = { };
	      if (paths.length === 0) {
	        stateToStore = state;
	      } else {
	        paths.forEach(function (p) {
	          stateToStore[p] = state[p];
	        });
	      }

	      try {
	        var saveState = JSON.stringify(stateToStore);
	        localStorage.setItem(key, saveState);
	      } catch (err) { }
	    });
	  }
	};

	var localstorage = persistState;

	function timeResource(resource) {
	  if (!performance) return null;

	  const performanceResourceEntries = performance.getEntriesByType("resource");
	  const resourceTimings = [];

	  for (const index in performanceResourceEntries) {
	    const entry = performanceResourceEntries[index];

	    if (entry.name.includes(resource)) {
	      resourceTimings.push(Math.ceil(entry.duration));
	    }
	  }

	  const resourceTimingsAverage = resourceTimings.length
	    ? resourceTimings.reduce((a, b) => a + b, 0) / resourceTimings.length
	    : null;

	  // const resourceTimingsMax = Math.max(...resourceTimings);
	  return resourceTimingsAverage;
	}

	var cart = cart => {
	  cart.on("@init", () => ({
	    cart: {
	      id: createCartIdentifier(),
	      meta: null,
	      items: [],
	      loading: true
	    }
	  }));

	  // cart.on("@dispatch", (state, [event, data]) => {});

	  cart.on("@changed", ({ cart }) => {
	    cart.loading = false;

	    cart.isEmpty = cart.items.length === 0;

	    cart.count = cart.items.reduce((sum, { quantity }) => sum + quantity, 0);

	    cart.subTotal = cart.meta
	      ? cart.meta.display_price.without_tax.formatted
	      : 0;

	    cart.items = cart.items.filter(
	      ({ type }) => type === "cart_item" || type === "custom_item"
	    );

	    cart.promotionItems = cart.items.filter(
	      ({ type }) => type === "promotion_item"
	    );

	    cart.taxItems = cart.items.filter(({ type }) => type === "tax_item");

	    cart.averageApiRequest = (() => {
	      const apiTime = timeResource("https://api.moltin.com");
	      if (apiTime) return apiTime;
	      else return cart.averageApiRequest;
	    })();
	  });

	  cart.on("setId", ({ cart }, cartId) => (cart.id = cartId));

	  cart.on("setCart", ({ cart }, { data, meta }) => {
	    return {
	      cart: {
	        ...cart,
	        items: data,
	        meta: meta
	      }
	    };
	  });

	  cart.on("getCart", async state => {
	    const payload = await moltinApi.get(`carts/${state.cart.id}/items`);
	    cart.dispatch("setCart", payload);
	  });

	  cart.on("deleteCart", async state => {
	    await moltinApi.delete(`carts/${state.cart.id}`);
	    cart.dispatch("setCart", {
	      data: [],
	      meta: null,
	      error: null
	    });
	  });

	  cart.on(
	    "addItem",
	    async (state, { quantity = 1, type = "cart_item", ...item }) => {
	      const payload = await moltinApi.post(`carts/${state.cart.id}/items`, {
	        type,
	        quantity,
	        ...item
	      });
	      cart.dispatch("setCart", payload);
	    }
	  );

	  cart.on("updateItem", async (state, item) => {
	    const { id: itemId, quantity } = item;
	    const { id: cartId } = state.cart;
	    try {
	      moltinApi.debounce = true;
	      const payload = await moltinApi.put(`carts/${cartId}/items/${itemId}`, {
	        type: "cart_item",
	        itemId,
	        quantity
	      });
	      moltinApi.debounce = false;

	      cart.dispatch("setCart", payload);
	    } catch (error) {
	      console.log(error);
	    }
	  });

	  cart.on("removeItem", async (state, itemId) => {
	    const { id: cartId } = state.cart;
	    const payload = await moltinApi.delete(`carts/${cartId}/items/${itemId}`);
	    cart.dispatch("setCart", payload);
	  });

	  cart.on("addPromotion", async (state, promotionCode) => {
	    const { id: cartId } = state.cart;

	    try {
	      const payload = await moltinApi.post(`carts/${cartId}/items`, {
	        type: "promotion_item",
	        promotionCode
	      });

	      cart.dispatch("setCart", payload);
	    } catch ({ statusCode }) {
	      console.log("Code expired or invalid");
	    } finally {
	      return {
	        state: {
	          cart: {
	            error: "error"
	          }
	        }
	      };
	    }
	  });
	};

	var modal = modal => {
	  modal.on("@init", () => ({
	    modal: {
	      route: "cart",
	      open: false
	    }
	  }));

	  modal.on("@changed", ({ modal }) => {
	    modal.checkingOut = ["shipping", "billing"].includes(modal.route);
	  });

	  modal.on("changeRoute", ({ modal }, route) => {
	    return {
	      modal: {
	        route: route,
	        open: true
	      }
	    };
	  });

	  modal.on("goToCart", () => modal.dispatch("changeRoute", "cart"));
	  modal.on("goToShipping", () => modal.dispatch("changeRoute", "shipping"));
	  modal.on("goToBilling", () => modal.dispatch("changeRoute", "billing"));
	  modal.on("goToOrders", () => modal.dispatch("changeRoute", "orders"));
	  modal.on("goToLogin", () => modal.dispatch("changeRoute", "login"));
	  modal.on("goToConfirmation", () =>
	    modal.dispatch("changeRoute", "confirmation")
	  );

	  modal.on("toggle", ({ modal }) => (modal.open = !modal.open));

	  modal.on("openCart", ({ modal }) => {
	    return {
	      modal: {
	        open: true,
	        route: "cart"
	      }
	    };
	  });

	  modal.on("closeModal", state => {
	    const { checkingOut } = state.modal;
	    const { completed } = state.checkout;

	    if (!completed && checkingOut) return;

	    modal.dispatch("close");
	  });

	  modal.on("close", ({ modal }) => {
	    return {
	      modal: {
	        open: false
	      }
	    };
	  });

	  modal.on("continueShopping", ({ modal }) => {
	    return {
	      modal: {
	        open: false,
	        route: "cart"
	      }
	    };
	  });
	};

	var checkout = checkout => {
	  checkout.on("@init", () => ({
	    checkout: {
	      route: "shipping",
	      dirty: false,
	      completed: false
	    }
	  }));
	};

	/*
	  Diff State Changes, Removing Redundant Events.
	  Special Thanks To: https://stackoverflow.com/a/37396358

	let oldState = {};
	function diffObject(object1, object2) {
	  return Object.keys(object2).reduce((diff, key) => {
	    if (Object.is(object1[key], object2[key])) return diff;
	    return {
	      ...diff,
	      [key]: object2[key]
	    };
	  }, null);
	}
	*/

	const events = mitt();
	const eventEmitter = function() {
	  return function(store) {
	    store.on("@changed", function(state) {
	      inEach(Object.keys(state), key => events.emit(key));
	    });
	  };
	};

	const store = storeon([
	  cart,
	  modal,
	  checkout,

	  eventEmitter(),
	  localstorage(["cart"], {
	    key: "mcart"
	  })
	]);

	function makeid() {
	    const {possible, n} = makeid;
	    let alphaHex = n.toString(26).split(''), c, r = '';
	    while(c = alphaHex.shift()) r += possible[parseInt(c, 26)];
	    makeid.n++;
	    return r
	}
	makeid.possible = "abcdefghijklmnopqrstuvwxyz";
	makeid.n = 0;

	let stylesheet = document.createElement('style');
	stylesheet.id = 'stage0';
	document.head.appendChild(stylesheet);
	stylesheet = stylesheet.sheet;

	function styles(stylesObj) {
	    for(let className in stylesObj) {
	        const genClass = `${className}-${makeid()}`;
	        
	        const ruleIdx = stylesheet.insertRule(`.${genClass} {}`, stylesheet.cssRules.length);
	        const ruleStyle = stylesheet.cssRules[ruleIdx].style;
	        
	        const classStyles = stylesObj[className];

	        for(let rule in classStyles) {
	            if (rule[0] === ':' || rule[0] === ' ') {
	                const pseudoRuleIdx = stylesheet.insertRule(`.${genClass}${rule} {}`, stylesheet.cssRules.length);
	                const pseudoRuleStyle = stylesheet.cssRules[pseudoRuleIdx].style;
	                Object.assign(pseudoRuleStyle, classStyles[rule]);
	                delete classStyles[rule];
	            }
	        }
	        
	        Object.assign(ruleStyle, classStyles);
	        
	        stylesObj[className] = genClass;
	    }

	    return stylesObj
	}

	var sanitizeSVG_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	const getWindow = () => typeof window === 'undefined' ? null : window;
	const readAsText = (svg) => new Promise((resolve) => {
	    if (!isFile(svg)) {
	        resolve(svg.toString('utf-8'));
	    }
	    else {
	        const fileReader = new FileReader();
	        fileReader.onload = () => {
	            resolve(fileReader.result);
	        };
	        fileReader.readAsText(svg);
	    }
	});
	const isFile = (obj) => {
	    return obj.size !== undefined;
	};
	const sanitizeSVG = async (svg, window = getWindow()) => {
	    if (!window)
	        throw new Error('DOM window required');
	    if (isFile(svg) && svg.type !== 'image/svg+xml')
	        return svg;
	    const svgText = await readAsText(svg);
	    if (!svgText)
	        throw new Error('Image corrupt');
	    const div = window.document.createElement('div');
	    div.innerHTML = svgText;
	    const svgEl = div.firstElementChild;
	    const scripts = svgEl.getElementsByTagName('script');
	    return (scripts.length === 0) ? svg : null;
	};
	exports.default = sanitizeSVG;
	//# sourceMappingURL=sanitizeSVG.js.map
	});

	var sanitizeSVG = unwrapExports(sanitizeSVG_1);

	const addClass = (node, _class) => node.classList.add(_class);

	const removeClass = (node, _class) => node.classList.remove(_class);

	const getSVG = async svgPath => {
	  return await fetch(svgPath)
	    .then(r => r.text())
	    .then(svg => {
	      return sanitizeSVG(svg);
	    });
	};

	const theme = {
	  primary: "#177EE6",
	  dark: "#273142",
	  text: "#333",
	  border: "#C5CCD6",
	  divider: "#D8DFEB",
	  error: "#E62F17",
	  success: "#5FC8AA",
	  white: "#fff",
	  placeholder: "#58697F",
	  cursor: "#E9EBF0",

	  textSmall: "0.875rem",
	  textBase: "0.9375rem",
	  textLarge: "1.125rem",
	  textExtraLarge: "1.25rem"
	};

	const SpinnerStyle = styles({
	  base: {
	    display: "inline",
	    "margin-right": "0.25rem"
	  }
	});

	const ButtonStyle = styles({
	  base: {
	    background: "none",
	    "box-sizing": "border-box",
	    "line-height": "1.15",
	    "-webkit-text-size-adjust": "100%",
	    margin: 0,
	    "font-family":
	      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif",
	    "font-size": "15px",
	    appearance: "none",
	    "border-radius": "0.25rem",
	    border: "1px solid transparent",
	    "font-weight": 500,
	    outline: "none",
	    padding: "0 1rem",
	    opacity: 1,
	    color: theme.placeholder,
	    "::before, ::after": {
	      "box-sizing": "inherit",
	      "-webkit-font-smoothing": "antialiased"
	    },
	    ":hover, :focus": {
	      outline: "none"
	    },
	    ":hover": {
	      cursor: "pointer"
	    }
	  },
	  primary: {
	    "background-color": theme.primary,
	    "border-color": theme.white,
	    color: theme.white,
	    height: "2.8rem",
	    display: "inline-flex",
	    "align-items": "center",
	    "justify-content": "center"
	  },
	  text: {
	    color: theme.dark,
	    "font-weight": 500,
	    "font-size": `${theme.textSmall} !important`,
	    "text-decoration": "underline",
	    padding: 0,
	    ":hover": {
	      color: theme.primary
	    }
	  },
	  noPadding: {
	    padding: 0
	  },
	  disabled: {
	    opacity: 0.5,
	    ":hover": {
	      cursor: "not-allowed"
	    }
	  },
	  block: {
	    width: "100%"
	  },
	  marginTop: {
	    "margin-top": "1.5rem"
	  },
	  large: {
	    height: "3.25rem"
	  }
	});

	const View = h`<button class=${ButtonStyle.base}>#text</button>`;

	function Button(item = {}) {
	  const {
	    text,
	    type,
	    block,
	    large,
	    loading,
	    disabled,
	    marginTop,
	    noPadding,
	    className
	  } = item;
	  const root = View.cloneNode(true);
	  const refs = View.collect(root);
	  const buttonText = refs.text;

	  root.update = text => (buttonText.nodeValue = text);
	  root.update(text);

	  if (className) addClass(root, className);
	  if (type) addClass(root, ButtonStyle[type]);
	  if (block) addClass(root, ButtonStyle.block);
	  if (large) addClass(root, ButtonStyle.large);
	  if (disabled) addClass(root, ButtonStyle.disabled);
	  if (marginTop) addClass(root, ButtonStyle.marginTop);
	  if (noPadding) addClass(root, ButtonStyle.noPadding);

	  if (loading) {
	    const spinner = document.createElement("span");

	    getSVG("assets/spinner.svg").then(svg => {
	      spinner.innerHTML = svg;
	      addClass(spinner.firstChild, SpinnerStyle.base);
	    });

	    spinner.cloneNode(true);

	    return spinner;
	  } else return root;
	}

	function addItem(item) {
	  item.moltinType !== "custom"
	    ? store.dispatch("addItem", { id: item.moltinProductId })
	    : store.dispatch("addItem", {
	        type: "custom_item",
	        name: item.moltinProductName,
	        sku: item.moltinProductSku,
	        price: {
	          amount: parseInt(item.moltinProductPrice, 10)
	        }
	      });

	  item.moltinOpenCart && store.dispatch("goToCart");
	}

	const View$1 = h`<span class=shopkit-buy-button></span>`;

	function BuyButton(item) {
	  const { moltinText, moltinType, moltinProductId } = item;
	  const root = View$1.cloneNode(true);

	  if (moltinType !== "custom" && !moltinProductId) {
	    console.warn("No product ID provided to Moltin Btn.");
	    return null;
	  }

	  root.appendChild(
	    Button({
	      text: moltinText || "Add to Cart",
	      type: "primary"
	    })
	  );

	  root.__click = () => addItem(item);

	  return root;
	}

	const View$2 = h`<span class=shopkit-cart-button></span>`;

	function CartButton(item) {
	  const { moltinText, moltinShowTotal } = item;
	  let { count, subTotal } = store.get().cart;

	  const root = View$2.cloneNode(true);

	  function buttonSuffix() {
	    return subTotal || count
	      ? ` (${moltinShowTotal ? subTotal : pluralize(count, "item")})`
	      : null;
	  }

	  const buttonText = () => `${moltinText || "Cart"}${buttonSuffix() || ""}`;

	  const child = Button({
	    text: buttonText(),
	    type: "primary"
	  });

	  root.appendChild(child);

	  root.update = () => {
	    ({ count, subTotal } = store.get().cart);
	    child.update(buttonText());
	  };

	  events.on("cart", () => root.update());

	  root.__click = () => store.dispatch("openCart");

	  return root;
	}

	const FastDom = fastdom.extend(fastdomPromised);

	function initialize(document) {
	  let script,
	    moltinClient,
	    moltinClientId,
	    moltinStripePublishableKey,
	    moltinCurrency;

	  FastDom.measure(() => {
	    script = document.querySelector("script[data-moltin-client-id]");
	  }).then(() => {
	    if (!script) {
	      console.error(
	        "You must provide a Moltin Client ID to enable the Moltin Btn"
	      );
	      return;
	    }

	    ({
	      moltinClientId,
	      moltinStripePublishableKey,
	      moltinCurrency
	    } = script.dataset);

	    if (!moltinStripePublishableKey) {
	      console.error(
	        "You must provide your Stripe Publishable Key to enable the Moltin Btn"
	      );
	      return;
	    }

	    moltinClient = new MoltinClient({
	      fetch: fetchController,
	      client_id: moltinClientId,
	      application: "moltin-btn",
	      ...(moltinCurrency && { moltinCurrency })
	    });
	    setApiHandler(moltinClient);
	  });

	  let buyButtons;
	  FastDom.measure(() => {
	    buyButtons = [...document.getElementsByClassName("moltin-buy-button")];
	  }).then(() => {
	    inEach(buyButtons, buyButton => {
	      FastDom.mutate(() =>
	        buyButton.appendChild(BuyButton({ ...buyButton.dataset }))
	      );
	    });
	  });

	  let cartButtons;
	  FastDom.measure(() => {
	    cartButtons = [...document.getElementsByClassName("moltin-cart-button")];
	  }).then(() => {
	    inEach(cartButtons, cartButton => {
	      FastDom.mutate(() =>
	        cartButton.appendChild(
	          CartButton({ loading: true, ...cartButton.dataset })
	        )
	      );
	    });
	  });

	  setupSyntheticEvent("click");
	}

	whenDomReady().then(() => initialize(document));

	assert.notEqual = notEqual;
	assert.notOk = notOk;
	assert.equal = equal;
	assert.ok = assert;

	var nanoassert = assert;

	function equal (a, b, m) {
	  assert(a == b, m); // eslint-disable-line eqeqeq
	}

	function notEqual (a, b, m) {
	  assert(a != b, m); // eslint-disable-line eqeqeq
	}

	function notOk (t, m) {
	  assert(!t, m);
	}

	function assert (t, m) {
	  if (!t) throw new Error(m || 'AssertionError')
	}

	var dftOpts = {};
	var hasWindow = typeof window !== 'undefined';
	var hasIdle = hasWindow && window.requestIdleCallback;

	var onIdle_1 = onIdle;

	function onIdle (cb, opts) {
	  opts = opts || dftOpts;
	  var timerId;

	  nanoassert.equal(typeof cb, 'function', 'on-idle: cb should be type function');
	  nanoassert.equal(typeof opts, 'object', 'on-idle: opts should be type object');

	  if (hasIdle) {
	    timerId = window.requestIdleCallback(function (idleDeadline) {
	      // reschedule if there's less than 1ms remaining on the tick
	      // and a timer did not expire
	      if (idleDeadline.timeRemaining() <= 1 && !idleDeadline.didTimeout) {
	        return onIdle(cb, opts)
	      } else {
	        cb(idleDeadline);
	      }
	    }, opts);
	    return window.cancelIdleCallback.bind(window, timerId)
	  } else if (hasWindow) {
	    timerId = setTimeout(cb, 0);
	    return clearTimeout.bind(window, timerId)
	  }
	}

	const HeaderStyles = styles({
	  base: {
	    display: "flex",
	    "align-items": "center",
	    "justify-content": "space-between"
	  }
	});

	const ButtonStyles = styles({
	  button: {
	    "background-color": "transparent",
	    padding: "0.25rem"
	  }
	});

	const NavStyles = styles({
	  base: {
	    fill: "currentColor",
	    width: "12px",
	    height: "12px"
	  }
	});

	const View$3 = h`<div class=${HeaderStyles.base}></div>`;

	function Header({ route } = {}) {
	  const { dirty, completed } = store.get().checkout;
	  const root = View$3.cloneNode(true);

	  const navButton = document.createElement("span");
	  if (route === "shipping" || (route === "billing" && !completed)) {
	    getSVG("assets/modal-back.svg").then(svg => {
	      navButton.innerHTML = svg;
	      addClass(navButton.firstChild, NavStyles.base);
	    });
	  } else {
	    getSVG("assets/modal-close.svg").then(svg => {
	      navButton.innerHTML = svg;
	      addClass(navButton.firstChild, NavStyles.base);
	    });
	  }

	  const button = Button({
	    className: ButtonStyles.button
	  });
	  button.appendChild(navButton);

	  // TODO : Remove Listener On Modal Close
	  button.__click = () => store.dispatch("closeModal");

	  root.append(button);

	  return root;
	}

	const RouteHeader = styles({
	  base: {
	    "text-align": "center",
	    "margin-bottom": "1.5rem"
	  }
	});

	const WrapperStyles = styles({
	  base: {
	    "align-items": "center",
	    display: "flex"
	  }
	});

	const Wrapper = h`<div class=${WrapperStyles.base}></div>`;

	const LinkStyles = styles({
	  base: {
	    cursor: "pointer",
	    display: "inline-flex",
	    "align-items": "center",
	    "font-family": "inherit",
	    "font-size": "100%",
	    "text-decoration": "none",
	    margin: "0 auto",
	    transition: "opacity 0.1s ease-in"
	  }
	});

	const Link = h`<a class=${LinkStyles.base}></a>`;

	const TextStyles = styles({
	  base: {
	    "margin-right": "0.5rem",
	    color: theme.placeholder,
	    "font-size": theme.textSmall
	  }
	});

	const Text = h`<span class=${TextStyles.base}>Powered by</span>`;

	const LogoStyles = styles({
	  base: {
	    height: "2rem"
	  }
	});

	function PoweredBy() {
	  const root = Wrapper;

	  const link = Link;
	  link.target = "_blank";
	  link.href = "https://www.moltin.com/commerce-solutions/embeddable-cart";

	  getSVG("assets/logo.svg").then(logo => {
	    link.innerHTML += logo;
	    addClass(link.lastChild, LogoStyles.base);
	  });

	  const text = Text;
	  link.appendChild(text);

	  root.appendChild(link);
	  return root;
	}

	const View$4 = h`<div></div>`;

	function Footer() {
	  const root = View$4;

	  const poweredBy = PoweredBy();
	  root.appendChild(poweredBy);

	  return root;
	}

	function OrderList() {
	  return document.createTextNode("Orderlist");
	}

	const View$5 = h`<div>Cart</div>`;

	function Cart() {
	  return View$5;
	}

	const View$6 = h`<div>Checkout</div>`;

	function Checkout() {
	  return View$6;
	}

	const Styles = styles({
	  base: {
	    transition: "all 0.3s ease",
	    "background-color": "#fff",
	    position: "fixed",
	    top: 0,
	    bottom: 0,
	    right: 0,
	    "overflow-y": scroll,
	    height: "100%",
	    "box-shadow": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
	    "z-index": 1000000001,
	    padding: "1.5rem",
	    width: "100%",
	    "border-width": 0,
	    "max-width": "500px",
	    display: "flex",
	    "flex-direction": "column",
	    "justify-content": "space-between",
	    "box-sizing": "border-box",
	    "line-height": 1.15,
	    "-webkit-text-size-adjust": "100%",
	    margin: 0,
	    "font-family":
	      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif",
	    "font-size": "15px",

	    "*, *::before, *::after": {
	      "box-sizing": "inherit",
	      "-webkit-font-smoothing": "antialiased"
	    }
	  },

	  hidden: {
	    opacity: 0,
	    visibility: "hidden",
	    transform: "translateX(525px)",
	    "will-change": "transform, opacity"
	  },

	  visible: {
	    opacity: 1,
	    visibility: "visible",
	    transform: "translateX(0)"
	  }
	});

	const View$7 = h`<div class="shopkit-modal ${Styles.base} ${Styles.hidden}"></div>`;

	function renderRoute(route) {
	  console.log(route);
	  switch (route) {
	    case "login":
	      return null; // LoginForm

	    case "orders":
	      return OrderList();

	    case "shipping":
	    case "billing":
	      return Checkout();

	    case "cart":
	    default:
	      return Cart();
	  }
	}

	function Modal(item = {}) {
	  let { route } = store.get().modal;

	  const root = View$7;
	  const header = Header({ route });
	  const footer = Footer();

	  const showModal = open =>
	    open ? addClass(root, Styles.visible) : removeClass(root, Styles.visible);

	  root.update = ({ openModal, route }) => {
	    showModal(openModal);

	    root.appendChild(header);
	    root.appendChild(renderRoute(route));
	    root.appendChild(footer);
	  };

	  return root;
	}

	const Styles$1 = styles({
	  base: {
	    transition: "all 0.3s ease",
	    "background-color": "#333",
	    position: "fixed",
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0,
	    "z-index": 1000000000
	  },

	  hidden: {
	    opacity: 0,
	    visibility: "hidden",
	    "overflow-x": 0,
	    "will-change": "opacity"
	  },

	  visible: {
	    opacity: 0.3,
	    visibility: "visible",
	    "overflow-x": 100
	  }
	});

	const View$8 = h`<div class="shopkit-modal-overlay ${Styles$1.base} ${Styles$1.hidden}"></div>`;

	function Overlay(item = {}) {
	  const { openModal } = item;
	  const root = View$8;

	  function showOverlay(openModal) {
	    if (openModal) addClass(root, Styles$1.visible);
	    else removeClass(root, Styles$1.visible);
	  }
	  showOverlay(openModal);

	  root.update = ({ openModal }) => {
	    showOverlay(openModal);
	  };

	  root.__click = () => store.dispatch("closeModal");

	  return root;
	}

	function initializeCart() {
	  // Send OAuth Request
	  store.dispatch("getCart");

	  let { open: openModal, route } = store.get().modal;

	  const cart = document.createElement("div");
	  addClass(cart, "moltin-shopkit");

	  const modal = Modal({ openModal });
	  const modalOverlay = Overlay({ openModal });

	  events.on("modal", () => {
	    ({ open: openModal, route } = store.get().modal);

	    modal.update({ openModal, route });
	    modalOverlay.update({ openModal });
	  });

	  cart.appendChild(modal);
	  cart.appendChild(modalOverlay);
	  document.body.appendChild(cart);
	}

	window.onload = () => {
	  onIdle_1(() => {
	    initializeCart();
	  });
	};

}());
//# sourceMappingURL=app.js.map
