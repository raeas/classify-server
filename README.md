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
URL:    
Method:    
Data Example:  
Success Response:  
Error Response:  
#### Subcategories
`GET /api/subcategories`  
Description:  Gets subcategories for the accordion display.  
URL:    
Method:    
Data Example:  
Success Response:  
Error Response:  
#### Bookshelf  
`GET /api/bookshelf`  
Description:  Gets all books with a join on categories and subcategories to display category and subcatetory name.  
URL:    
Method:    
Data Example:  
Success Response:  
Error Response:  
#### Books
`GET /api/books`  
Description:  Get all books  
URL:    
Method:    
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
Success Response:  
Error Response:  


`POST /api/books`  
Description:  
URL:    
Method:    
Data Example:  
Success Response:  
Error Response:    


`PATCH /api/books`  
Description:  
URL:    
Method:    
Data Example:  
Success Response:  
Error Response:    


`DELETE /api/books`  
Description:  
URL:    
Method:    
Data Example:  
Success Response:  
Error Response:  


### Tech Stack
- Node.js
- Express
- Mocha
