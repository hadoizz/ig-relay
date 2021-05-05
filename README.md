## Development

```bash
npm run dev
```

Two servers will be hosted: first that contains the back-end (./www) at localhost:8080 and the second one with the front-end (./www/client) at localhost:3000.

## Production

Instead of two servers, there will be only one server that merges the front-end with the back-end.

Please set `REACT_APP_SERVER` environment variable to `/` and recompile everything with `npm run build`. This variable tells the client that it should send all requests over the same domain as it is hosted on. Also, don't forget to set `NODE_ENV` to `production` and `PORT` to `80`.

To start the program run `npm start`.

## Well-known issues

CRA (www/client) detects different version of babel-jest higher up in the tree (in www directory) and prompts an error.
The solution is to set `SKIP_PREFLIGHT_CHECK` to `true`.
