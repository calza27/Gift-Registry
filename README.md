# Gift-Registry
Gift registry website
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Specs
User is presented with the home page where they have the option to log in, or enter the unique code to an existing list.

Logging in (via social integration/cognito) gives the user edit access to their list, allowing them to add/remove gifts.
Gifts should have a title, price, description, place of purchase and URL fields, with the option to upload an image.
Stretch goal to copy Giftsters ability to auto-magically fetch the details from the given link. 

Viewing a list shows the name of the product, the image, and price for each gift. Clicking an item shows more details.

Not being logged in, or logging in and viewing someone elses list, gives the user read only access to the list.
User in this case has the ability to reserve gift(s) (for purchase) or mark gits as purchased.

User logged in and managing their list have the ability to toggle whether they can see if a gift has been reserved or not.

## Tech Stack
Front end web page written in next.js

Cognito user pool to manage users and authentication

API Gateway invoking Golagn lambda functions - cognito used as authentication pool

DynamoDB to serve as a data store for gift entries and list settings

S3 bucket for storing images

## Supporting Repos
[Supporting Infrastructure (S3, DynamoDb, Cognito)](https://github.com/calza27/GR-Infra)

[API and Lambdas](https://github.com/calza27/GR-API)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
