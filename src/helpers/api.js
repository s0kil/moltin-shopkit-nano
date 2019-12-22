export let moltinApi, stripeKey;

export function setApiHandler(options) {
  ({client: moltinApi, stripeKey} = options);
  moltinApi.debounce = false;
}

let controller, signal;

export function fetchController(uri, options) {
  /*
  if (moltinApi.debounce && controller !== undefined) controller.abort(); // Cancel The Previous Request
  if (AbortController) {
    controller = new AbortController();
    signal = controller.signal;
  }
  */

  return fetch(uri, {
    // signal,
    ...options
  });
}
