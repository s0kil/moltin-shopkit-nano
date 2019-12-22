import {removeLeadingSlash} from "./utilities";

export default async function requestHandler(
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
    ...(application && {"X-MOLTIN-APPLICATION": application}),
    ...(currency && {"X-MOLTIN-CURRENCY": currency}),
    ...(customer_token && {"X-MOLTIN-CUSTOMER-TOKEN": customer_token}),
    ...customHeaders
  };

  const body = customHeaders["Content-Type"]
    ? data
    : {body: JSON.stringify({data})};

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
