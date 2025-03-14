Here’s a detailed **GitHub repository description** you can use to explain your REST API project, including the Node.js, MongoDB Atlas, and Postman setup. You can add this description to your GitHub repository's `README.md` file or use it as a guide for your users.

---

## **Movie REST API with Node.js, MongoDB Atlas, and Postman**

This project is a simple **REST API** for managing a collection of movies. It allows users to perform **CRUD operations** (Create, Read, Update, Delete) on movie data. The API is built using **Node.js**, **Express**, and **MongoDB Atlas** for database storage. Below, you'll find step-by-step instructions to set up and test the API using **Postman**.

---

### **Features**
- **Create a new movie**: Add a movie with details like name, image URL, and summary.
- **Retrieve all movies**: Fetch a list of all movies stored in the database.
- **Retrieve a specific movie**: Fetch details of a single movie by its ID.
- **Update a movie**: Modify the details of an existing movie.
- **Delete a movie**: Remove a movie from the database.

---

### **Technologies Used**
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for handling HTTP requests.
- **MongoDB Atlas**: Cloud-based database for storing movie data.
- **Postman**: Tool for testing API endpoints.

---

### **Prerequisites**
Before you begin, ensure you have the following installed:
1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
2. **MongoDB Atlas Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. **Postman**: Download and install from [postman.com](https://www.postman.com/).

---

### **Setup Instructions**

#### 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/your-username/movie-api.git
cd movie-api
```

#### 2. Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

#### 3. Set Up MongoDB Atlas
1. Log in to your MongoDB Atlas account.
2. Create a new cluster and database.
3. Add a user with read/write access to the database.
4. Copy the connection string (URI) for your cluster.

#### 4. Configure Environment Variables
Create a `.env` file in the root directory of the project and add your MongoDB Atlas URI:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
PORT=5000
```
Replace `username`, `password`, and `mydatabase` with your MongoDB Atlas credentials.

#### 5. Start the Server
Run the server:
```bash
node server.js
```
The server will start on `http://localhost:5000`.

---

### **API Endpoints**

#### 1. **Create a Movie**
- **Method**: `POST`
- **URL**: `http://localhost:5000/movies`
- **Body** (JSON):
  ```json
  {
    "name": "Inception",
    "img": "https://bit.ly/3nWq7Kp",
    "summary": "A thief who steals corporate secrets through the use of dream-sharing technology."
  }
  ```

#### 2. **Get All Movies**
- **Method**: `GET`
- **URL**: `http://localhost:5000/movies`

#### 3. **Get a Single Movie by ID**
- **Method**: `GET`
- **URL**: `http://localhost:5000/movies/:id`
- Replace `:id` with the actual movie ID.

#### 4. **Update a Movie**
- **Method**: `PATCH`
- **URL**: `http://localhost:5000/movies/:id`
- **Body** (JSON):
  ```json
  {
    "summary": "Updated summary of the movie."
  }
  ```

#### 5. **Delete a Movie**
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/movies/:id`

---

### **Testing the API with Postman**

1. **Import the Collection**:
   - Open Postman.
   - Import the collection provided in the `postman` folder of this repository (if available).

2. **Test Endpoints**:
   - Use the imported collection to test the API endpoints.
   - Replace placeholders (e.g., `:id`) with actual values.

3. **Example Workflow**:
   - Use the **POST** request to create a new movie.
   - Use the **GET** request to retrieve all movies.
   - Use the **GET** request with an ID to retrieve a specific movie.
   - Use the **PATCH** request to update a movie.
   - Use the **DELETE** request to delete a movie.

---

### **Folder Structure**
```
movie-api/
├── models/
│   └── Movie.js          # Movie schema and model
├── server.js             # Main server file
├── .env                  # Environment variables
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

---

### **Contributing**
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. For major changes, please open an issue first to discuss the changes.

---

### **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### **Support**
If you encounter any issues or have questions, please open an issue on GitHub or contact me at [your-email@example.com].

---

### **Live Demo**
You can test the API live at [insert live URL if deployed].

---

This description provides a clear and structured guide for users to understand, set up, and test your REST API project. Let me know if you need further assistance!
