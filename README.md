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
And wait a while (a long while) for the Docker images and containers are set up (you can tell if the terminal stop changing, such as below:
![Screenshot from 2022-01-12 17-07-15](https://user-images.githubusercontent.com/56032607/149230813-f4b1309a-7b51-4d31-b4ec-f10f14fb6ee6.png)

Then the client site will be accessible at http://localhost:3000, while server is ready at http://localhost:3001.

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

## API Endpoints
* Inventory:  
  * GET /inventorys - get a list of all the items in the inventory, add '?range=[a, b]' to url (query string) to get inventories in range from a to before b
  * GET /inventorys/:id - get item with specific id
  * POST /inventorys - create a new item in inventory with parameters:
    * name
    * desc
    * warehouses: [{id: ObjectId}] - array of ids of warehouses that an inventory is assigned to, with the idea that a type of inventory can be available at many sites
  * PUT /inventorys/:id - update inventory with specific id
  * DELETE /inventorys/:id - delete (hide) inventory with specific id. We will not actually delete it, but to set its isHidden flag to true and hide it on client site.
* Warehouse
  * GET /warehouses - get a list of all warehouses, add '?range=[a, b]' to url (query string) to get warehouses in range from a to before b
  * GET /warehouses/:id - get warehouse with specific id
  * POST /warehouses - create a new warehouse with parameters:
    * name - String
    * address - String
  * PUT /warehouses/:id - update warehouse with specific id
  * DELETE /warehouses/:id - delete (hide) warehouse with specific id. We will not actually delete it, but to set its isHidden flag to true and hide it on client site.

After installation, you can test the API by using the client site or Postman. Please let me innnnnnn.

## HOW-TO-USE client site
![image](https://user-images.githubusercontent.com/56032607/149070788-e6648e99-f54d-42fa-8131-a15ffee9c3d5.png)

When you first visit, both the Inventory and Warehouse tabs should be blank since no datas are in yet. 
Feel free to create some Inventory and Warehouse by clicking the Add An Inventory/Warehouse button.

![image](https://user-images.githubusercontent.com/56032607/149071133-1e10516a-5674-4df4-a896-ffe69d4ac730.png)
![image](https://user-images.githubusercontent.com/56032607/149071244-a4de9758-2d5b-4840-ba0c-b1c912b36514.png)

After you have created some Warehouses, you can find them assignable in Inventory Create (and later Inventory Edit)

![image](https://user-images.githubusercontent.com/56032607/149071460-c066fd9f-de8f-4a81-b4d7-28914b501bd9.png)
![image](https://user-images.githubusercontent.com/56032607/149071424-61cd41a8-9992-49aa-822a-ffb114e7efa4.png)

Last but not least, you can view the Inventories/Warehouses as well as clicking them to expand

![image](https://user-images.githubusercontent.com/56032607/149071835-616a037c-ad03-4a42-bce3-63e8d56b9bde.png)
![image](https://user-images.githubusercontent.com/56032607/149071861-0d34a221-1a6f-40e0-8242-3e10dd6b0584.png)


You should find the rest of the UI easy to use. Happy new semester.
