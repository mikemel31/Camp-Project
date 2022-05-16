# Camp-project
## Description
This app is a copy of YelpCamp that was created during the Web Developer Bootcamp. This app provides people with information about different Camps where people can stay during their trip. 

## User Stories
- As a user, I want to be able to view a Homepage for the site.
- As a user, I want to be able to Register for an account.
- As a user, I want to Login.
- As a user, I want to be able to Logout when I am done using the site, but have information saved in the database.
- As a user, I want to be able to create a new campground
- As a user, I want to be able to edit a campground, created by user
- As a user, I want to be able to delete a campground, created by user
- As a user, I want to be able to leave a review about any campground
- As a user, I want to be able to delete a review about any campground, left by user
- As a user, I want to be able to upload images of campground

These are the tools that a user can access:
- Register/Login
- Create Campground
- Edit Campground
- Delete Campground
- Leave a review about campground
- Delete a review about campground

## Routes 
| METHOD    | URL                                                  |           Action                      |       Redirect        |
| :---      | :----:                                               |            :----:                     |         ---:          |
|   GET     | /                                                    |   Display Homepage                    |       /home           |
|   GET     | /home                                                |   Display Homepage                    |                       |
|   GET     | /register                                            |   Display Signup Page                 |                       |
|   POST    | /register                                            |   Creating new user                   |       /home           |
|   GET     | /login                                               |   Display Login Page                  |                       |
|   POST    | /login                                               |   Signing in                          |                       |
|   POST    | /logout                                              |   Loging out                          |       /home           |
|   GET     | /campgrounds                                         |   Display All Campgrounds             |                       |
|   POST    | /campgrounds                                         |   Adding new Campground               |       /campgrounds    |
|   GET     | /campgrounds/new                                     |   Display creating Campground page    |                       |
|   GET     | /campgrounds/:id                                     |   Display Campground page             |                       |
|   DELETE  | /campgrounds/:id                                     |   Delete Campground                   |       /campgrounds    |
|   PATCH   | /campgrounds/:id                                     |   Edit Campground                     |   /campgrounds/:id    |
|   GET     | /campgrounds/:id/edit                                |   Display edit info Campground page   |                       |
|   GET     | /campgrounds/:id/editImg                             |   Display edit images Campground page |                       |
|   POST    | /campgrounds/:id/reviews                             |   Add review                          |    /campgrounds/:id   |
|   DELETE  | /campgrounds/:id/reviews/:id                         |   Delete review                       |    /campgrounds/:id   |
|   GET     | *                                                    |   Redirect from page that is not exist|                       |


## Models Schemas 
<img width="289" alt="Screen Shot 2022-05-15 at 6 44 44 PM" src="https://user-images.githubusercontent.com/73794980/168506454-b5d0448b-ebc2-4375-b7a2-63d4fa73722e.png">
<img width="244" alt="Screen Shot 2022-05-15 at 6 45 03 PM" src="https://user-images.githubusercontent.com/73794980/168506458-aa7ac9c8-c4f6-4312-994b-3539de575fd5.png">
<img width="303" alt="Screen Shot 2022-05-15 at 6 47 06 PM" src="https://user-images.githubusercontent.com/73794980/168506484-a081eef2-b280-4eee-88c3-c48a35bf66d4.png">
<img width="291" alt="Screen Shot 2022-05-15 at 6 47 27 PM" src="https://user-images.githubusercontent.com/73794980/168506465-50cd8093-e6c3-4ae0-ba82-c0cf62b179e6.png">


## Technologies and APIs

1. EJS (making templates of pages)
2. Express.js, Node.js (manage routes, handling requests and views)
3. Mongoose (create all necessary for project models)
4. MongoDB (save and store users: authorization info, trips, expenses, checklists etc)
5. Passport (registering, logging in, logging out users)
6. Multer (getting information from forms where files are)
7. Joi (forms validation)
8. Connect-flash (storing messages)
9. Dotenv package (hide/ store secret important information)
10. APIs: mapbox.com; cloudinary.com;

## Screenshots
<img width="1439" alt="Screen Shot 2022-05-14 at 11 44 43 AM" src="https://user-images.githubusercontent.com/73794980/168506955-bce7b308-cb28-457a-83f3-47dd19c59056.png">
<img width="1439" alt="Screen Shot 2022-05-14 at 11 45 00 AM" src="https://user-images.githubusercontent.com/73794980/168506965-69637ff1-1f66-476f-a7bc-c2c6e5705840.png">
<img width="1439" alt="Screen Shot 2022-05-14 at 11 48 15 AM" src="https://user-images.githubusercontent.com/73794980/168506970-6a24e43e-246c-4711-a8a8-3d086224f75d.png">
<img width="1439" alt="Screen Shot 2022-05-14 at 11 48 30 AM" src="https://user-images.githubusercontent.com/73794980/168506972-333272f4-a977-41b6-94fb-9d13dea75f01.png">

