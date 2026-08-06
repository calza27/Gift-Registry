# Gift-Registry
 
The frontend for **Gift Registry** — a wish-list style web app. A signed-in user builds a list of gifts they'd like to receive and shares it via a unique link/code; anyone with that link can view the list read-only and mark gifts as reserved or purchased, so other prospective gifters can see what's already been bought without spoiling the surprise for the list owner.
 
This is a [Next.js](https://nextjs.org) app (statically exported) and is one of three repos that make up the project:
 
| Repo | Role |
|---|---|
| [GR-Infra](https://github.com/calza27/GR-Infra) | Shared AWS infrastructure: S3 (incl. the website bucket this site is deployed to), DynamoDB, Cognito |
| [GR-API](https://github.com/calza27/GR-API) | Go Lambda backend + API Gateway that this app calls |
| **Gift-Registry** (this repo) | Next.js frontend |
 
## App behaviour
 
- The home page lets a visitor log in, or enter a list's unique sharing code to view it directly.
- Logging in (Cognito) gives a user edit access to their own list: adding/removing gifts (title, price, description, place of purchase, URL, optional image), reordering, etc.
- Viewing a list (whether logged out, or logged in and viewing someone else's list) shows each gift's name, image and price, with more detail on click, and is **read-only** except for reserving/marking gifts as purchased.
- The list owner can toggle whether they themselves are able to see which gifts have been reserved/purchased, so they can be surprised too.
## Repository structure
 
```
Gift-Registry/
├── pages/                     Next.js pages (file-based routing)
│   ├── index.js                Home — login or enter a share code
│   ├── login.js / register.js  Cognito auth flows
│   ├── password/                Password reset request + confirmation code
│   ├── confirm.js              Cognito sign-up confirmation
│   ├── profile.js              Logged-in user's profile
│   ├── about.js                 Static about page
│   ├── list/index.js           View a list (owner or shared/read-only)
│   ├── list/new.js             Create a new list
│   ├── list/edit.js            Edit list details
│   └── list/gift/              View (index.js) / add (new.js) / edit (edit.js) a gift within a list
│   └── _app.js                 Next.js app shell
├── components/                 Reusable UI: forms (GiftForm, ListForm), inputs (InputField, TextArea, SearchField, Label…), list/gift display (GiftListObject, ListObject, GiftImage), buttons, auth helper text, user details
│   └── layouts/                 Page chrome: AuthLayout, InputLayout, PageLayout
├── hooks/                      Thin fetch wrappers around the GR-API endpoints, plus local state helpers
│   ├── user.js                  Get/update user details
│   ├── list.js                  Create/get/update/delete lists
│   ├── gift.js                  Create/get/update/delete gifts, purchase/unpurchase
│   ├── image.js                 Upload images, get pre-signed image URLs
│   ├── cookies.js                Cognito token + user cookie storage (`js-cookie`)
│   └── useValidationSchema.js    Formik/Yup validation schemas for forms
├── const/
│   └── api.js                  `GR_API_DOMAIN` — base URL of the GR-API deployment
├── utils/
│   ├── price.js                  Price formatting helpers
│   └── url.js                    URL helpers
├── styles/                     Global and module CSS
├── public/                     Static assets/icons
├── bin/
│   └── deploy.sh                Builds the static site and syncs it to the GR-Infra website S3 bucket
├── package.json / next.config.js / jsconfig.json / eslint.config.mjs
└── README.md
```
 
## Infrastructure
 
This repo does not define any CloudFormation/SAM templates of its own — there are no `.yaml`/`.yml` infra files here. It deploys as a static site onto infrastructure defined in [GR-Infra](https://github.com/calza27/GR-Infra):
 
- `next.config.js` sets `output: 'export'` (a fully static build, no Node server) with `trailingSlash: true` and unoptimized images, since the site is served straight from S3.
- `bin/deploy.sh <aws-profile>`:
  1. Looks up the website bucket name from the SSM parameter `/gift-registry/s3/website/name` — the bucket provisioned by GR-Infra's `cf/infra.yaml`.
  2. Runs `npm run build` to produce the static export in `./out`.
  3. Syncs `./out` to that S3 bucket with `aws s3 cp --recursive`.
- Authentication is against the Cognito User Pool provisioned by GR-Infra (via `amazon-cognito-identity-js` / `@aws-sdk/client-cognito-identity-provider`); the resulting ID token is stored in a cookie (`hooks/cookies.js`) and sent as a `Bearer` token on authenticated GR-API calls.
See [GR-Infra](https://github.com/calza27/GR-Infra)'s README for the S3, DynamoDB and Cognito resources this site and its API depend on.
 
## API
 
This repo has no backend API of its own — it is a client of [GR-API](https://github.com/calza27/GR-API). `const/api.js` points at the deployed API's base URL (`GR_API_DOMAIN`), and each file in `hooks/` wraps one or more GR-API endpoints:
 
| Hook | GR-API endpoint(s) used |
|---|---|
| `hooks/user.js` | `GET /user/{user_id}`, `POST /user/{user_id}` |
| `hooks/list.js` | `POST /list`, `GET /list`, `GET /list/{list_id}`, `PUT /list/{list_id}`, `DELETE /list/{list_id}` |
| `hooks/gift.js` | `GET /list/{list_id}/gift`, `POST /list/{list_id}/gift`, `GET /list/{list_id}/gift/{gift_id}`, `PUT /list/{list_id}/gift/{gift_id}`, `DELETE /list/{list_id}/gift/{gift_id}`, `POST .../purchase`, `POST .../unpurchase` |
| `hooks/image.js` | `PUT /image`, `GET /image/{file_name}` |
 
Requests that only read a public/shared list or gift, or that reserve/purchase a gift, are sent without requiring a token; everything else attaches the Cognito token as `Authorization: Bearer <token>`, matching the public-vs-owner authorization model described in [GR-API](https://github.com/calza27/GR-API)'s README. For full endpoint definitions, request/response schemas and auth requirements, see that repo.
 
## Getting started
 
```bash
npm install
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000). Set `const/api.js`'s `GR_API_DOMAIN` (and the Cognito pool details used by the auth pages) to point at a deployed [GR-API](https://github.com/calza27/GR-API)/[GR-Infra](https://github.com/calza27/GR-Infra) environment.
 
```bash
npm run build   # static export to ./out
npm run lint
```
 
## Deploy
 
```bash
./bin/deploy.sh <aws-profile>
```
 
Requires the `aws` CLI, an AWS profile with write access to the GR-Infra website bucket, and the [GR-Infra](https://github.com/calza27/GR-Infra) stack already deployed.