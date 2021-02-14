# Dewey Classify App Server
This is the server for virtual bookshelf app where you can add and classify your books.

-----
### Link to live app
Live version of the client can be found here <a href = "https://classify-app.vercel.app/">https://classify-app.vercel.app/</a>

### API Base url
<a href = "https://rocky-reaches-94023.herokuapp.com/api">https://rocky-reaches-94023.herokuapp.com/api</a>

-----
### Summary
The Dewey Classify App let's users become the librarian of their own library. Users can enter their books into the app and create a virtual bookshelf by classifying their books with a simplified Dewey Decimal Classification system. Users can choose how they want to classify their books and can then browse the bookshelf entries.

### Endpoints

#### Categories
`GET /api/categories`  
Description: Gets categories for the accordion display.    
Data Example:  
```
{
    "id": 1,
    "name": "0 Information"
},
{
    "id": 2,
    "name": "1 Philosophy & Psychology"
},
{
    "id": 3,
    "name": "2 Religions"
}
```
Success Response: 200 OK  
Error Response: 404 Not Found  
#### Subcategories
`GET /api/subcategories`  
Description:  Gets subcategories for the accordion display.   
Data Example:  
```
{
    "id": 1,
    "name": "000 Computing & Information",
    "category": 1
},
{
    "id": 2,
    "name": "010 Bibliographies",
    "category": 1
},
{
    "id": 3,
    "name": "020 Library & Information Sciences",
    "category": 1
},
{
    "id": 4,
    "name": "030 Dictionaries & Encylopedias",
    "category": 1
}
```
Success Response: 200 OK  
Error Response: 404 Not Found
#### Bookshelf  
`GET /api/bookshelf`  
Description:  Gets all books with a join on categories and subcategories to display category and subcatetory name.    
Data Example:  
```
{
    "id": 2,
    "title": "The Splended and the Vile",
    "author_last": "Larson",
    "author_first": "Erik",
    "description": "It is a story of political brinkmanship, but it's also an intimate domestic drama, set against the backdrop of Churchill's prime-ministerial country home, Chequers.",
    "category": "9 History & Geography",
    "subcategory": "940 European History"
},
{
    "id": 3,
    "title": "Happiness Becomes You",
    "author_last": "Turner",
    "author_first": "Tina",
    "description": "Tina is a global icon of inspiration. And now, with Happiness Becomes You: A Guide to Changing Your Life for Good, Tina shows how anyone can overcome life's obstacles.",
    "category": "1 Philosophy & Psychology",
    "subcategory": "150 Psychology"
}
```
Success Response:  200 OK  
Error Response: 404 Not Found  
#### Books
`GET /api/books`  
Description:  Gets all books     
Data Example:  
```
{
    "id": 3,
    "title": "Happiness Becomes You",
    "author_last": "Turner",
    "author_first": "Tina",
    "description": "Tina is a global icon of inspiration. And now, with Happiness Becomes You: A Guide to Changing Your Life for Good, Tina shows how anyone can overcome life's obstacles.",
    "category_id": 2,
    "subcategory_id": 15
}
```
Success Response: 200 OK  
Error Response: 404 Not Found


`POST /api/books`  
Description:   Add a book to the bookshelf. Required fields are "title", "category_id", and "subcategory_id"  
Data Example:  
```
{
    "title": "Becoming",
    "author_last": "Obama",
    "author_first": "Michelle",
    "description": "",
    "category_id": 10,
    "subcategory_id": 97 
}
```
Success Response: 201 Created  
Error Response: 400 Bad Request "'${field}' is required'"


`PATCH /api/books/${bookId}`  
Description: Updates a book. Required fields are "title", "category_id", and "subcategory_id"        
Data Example:  
```
{
    "title": "Becoming",
    "author_last": "Obama",
    "author_first": "Michelle",
    "description": "An intimate memoir by the former First Lady chronicles the experiences that have shaped her remarkable life, from her childhood on the South Side of Chicago through her setbacks and achievements in the White House.",
    "category_id": 10,
    "subcategory_id": 97
}
```
Success Response: 200 OK  
Error Response: 400 Bad Request - "'${field}' is required'"   


`DELETE /api/books/${bookId}`  
Description: Deletes a book     
Success Response: 200 OK  
Error Response: 404 Not Found - "Book Not Found"


### Tech Stack
- Node.js
- Express
- Mocha
