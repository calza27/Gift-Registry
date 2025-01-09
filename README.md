# Gift-Registry
Gift registry website

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

