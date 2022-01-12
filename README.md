# shopify-backend-developer-intern-challenge-summer-2022
## Introduction
An inventory tracking web application with a React client page + Express server + MongoDB. 
This project supports two main document types: Inventory and Warehouse. 
As a result it suffices the primary requirement of the challenge.
For the additional requirement, apparently <Ability to create warehouses/locations and assign inventory to specific locations> was chosen.
I also support CRUD operations for this document + assigning inventory to them, albeit in my understanding it's more like adding the warehouses to the inventory info.
Especially when it comes to updating and deleting warehouse info, the display of warehouses of products also change, maintaining integrity in database.

## Installation
### Docker & Docker compose
I would really prefer you to have Docker and docker-compose, or you can install them by following the documentation (https://docs.docker.com/ and https://docs.docker.com/compose).
In case you do or have just installed it, you may:
```
git clone https://github.com/theanh28/shopify-backend-challenge-summer-2022.git
docker-compose up
```
And the client site will be accessible at http://localhost:3000, while server is ready at http://localhost:3001.
You can now skip to HOW-TO-USE.

### Non-Docker way
Download Node by following https://nodejs.org/en/.
  
Then you can follow https://zellwk.com/blog/local-mongodb/
and install, set up local mongodb, 
create a database name 'spf', 
add a user 'tester' with password 'passwd' to that database.

Finally, you can have 2 terminals, on the first one:
```
cd ./server
npm install
npm start
```
on the other one:
```
cd ./client
npm install
npm start
```

## HOW-TO-USE
