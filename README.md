# ToDo App

Basic `CRUD` ToDo app API built using `Node.js` with `express.js` and `TypeScript`. Dockerized for easier development and deployment

## Installation

1. Clone the repository:

```bash
git <Repo-Link>
cd ToDo-App
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file based on the `.env.example`

```bash
cp .env.example .env
```

Then change the `.env` with the port you want to use
for eg:

```bash
PORT=3000
```

## Usage

To start the server in development mode with hot-reloading:

```bash
npm start
```

The server will start on the port specified in your `.env` file.

## Available Routes

### 1. Get All Tasks

  - **Route:** `/tasks`
  - **Method:** `GET`
  - **Description:** Retrieves all tasks.
  - **Response Data:** A list of all tasks or a message if there is no task

### 2.  Get Task by ID

  - **Route:** `/tasks/:id`
  - **Method:** `GET`
  - **Description:** Retrieves a task by its ID.
  - **Request Parameter:**
    - `id`: The ID of the task to retrieve.
  - **Response Data:** The task object with the specified Id or and error message if the task was not found.

### 3.  Create Task

  - **Route:** `/tasks`
  - **Method:** `POST`
  - **Description:** Creates a new task.
  - **Request Body:**
    Task details. For eg:
    ```json
    {
      "title": "new task",
      "desc": "description for new task",
      "status": "not started"
    }
    ```
  - **Response Data:** A message indicating the task was created, including the task's detail.

### 4. Update Task

  - **Route:** `/tasks/:id`
  - **Method:** `PATCH`
  - **Description:** Updates an existing task by its ID.
  - **Request Parameter:**
    - `id`: The ID of the task to update.
  - **Request Body:** The new details of the task to update
  - **Response Data:** A message indicating the task was updated or an error message if the task was not found.

### 5. Delete Task

  - **Route:** `/tasks/:id`
  - **Method:** `DELETE`
  - **Description:** Deletes a task by its ID.
  - **Request Parameter:**
    - `id`: The ID of the task to delete.
  - **Response Data:** A message indicating the task was deleted, or an error message if the task was not found.

## Example Usage

- **Get All Tasks**

  ```bash
  curl -X GET http://localhost:8080/tasks
  ```

- **Get Task by ID**

  ```bash
  curl -X GET http://localhost:8080/tasks/{id}
  ```

- **Create Task**

  ```bash
  curl -X POST http://localhost:8080/tasks -H "Content-Type: application/json" -d '{"title": "do smething", "desc": "description", "status": "not started"}'
  ```

- **Update Task by ID**

  ```bash
  curl -X PATCH http://localhost:8080/tasks/{id} -H "Content-Type: application/json" -d '{"status": "completed"}'
  ```

- **Delete Task by ID**

  ```bash
  curl -X DELETE http://localhost:8080/tasks/{id}
  ```