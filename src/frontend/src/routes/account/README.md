# Authentication pages

This section of the frontend is heavily based on the sample React project Allauth made to demonstrate how to use the `allauth.headless` library. Their code's documentation is rather lacking however, so I aim to add that documentation whenever possible. If something is explained by official Allauth documentation, link to it in a comment like so:

```ts
/**
 * Perform login.
 *
 * **Allauth documentation:** https://docs.allauth.org/en/latest/headless/openapi-specification/#tag/Authentication:-Account/paths/~1_allauth~1%7Bclient%7D~1v1~1auth~1login/post
 */
function login(...) { /* ... */ }
```

It's kind of ugly, but then we know why that function does what it does.

## URLs and Routes

There aren't specific routes the frontend has to use, as long as it hits the right endpoints. Let's keep all the authentication routes under `/account`.

As for said API endpoints, refer to the [`URLs` enum in '$lib/auth/allauth'](../../lib/auth/allauth.ts).

<!-- Refer to the [`URLs` enum in '$lib/auth/allauth'](/src/frontend/src/lib/auth/allauth.ts) -->

## Documentation

- Allauth's OpenAPI documentation is available here: [django-allauth: Headless API (1)](https://docs.allauth.org/en/latest/headless/openapi-specification/)
