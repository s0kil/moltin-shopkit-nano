export default async function authenticator() {
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
