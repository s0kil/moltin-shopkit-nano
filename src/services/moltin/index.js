import storageAdapter from "./storage";
import authenticator from "./authenticator";
import requestHandler from "./request";

export { createCartIdentifier } from "./utilities";

export function MoltinClient(options) {
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
