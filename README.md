# Igrapher guideline


## Prerequisites
This guide assumes you're working on a Linux/Unix based machine.

Before proceeding with the installation, ensure that you install the following on your system:

-   **Git**: Version control system for cloning the project repository. You can download Git from the official website: [https://git-scm.com/downloads](https://git-scm.com/downloads)
-   **Python3.11**: The programming language of choice for the backend. Download at: [https://www.python.org/downloads/](https://www.python.org/downloads/)
-   **NPM**: The Package Manager for front-end. Download at: [https://docs.npmjs.com/about-npm](https://docs.npmjs.com/about-npm).

## ⚠️⚠️⚠️ [Git Gud Guide](docs/gitgud.md)
🤣LOADING...

## Run the Backend && Frontend

1. Now we can just run 
```
    npm start
```
in the root dir after we have installed all the dependencies.

### Backend
1.  **Clone the Repository**: Open your terminal and execute the following command to clone the Backend repository:

    ```
    git clone git@github.com:unsw-cse-comp99-3900-24t1/capstone-project-9900h14afantisticidea.git
    ```

    This command will create a local copy of the project on your machine.

2.  **Create a Virtual Environment**: Before working with the backend, you should create a virtual environment with the following command:

    ```
    python3 -m venv .venv
    ```

3.  **Start your virtual environment**: Now start your virtual environment by typing:

    ```
    activate backend/.venv/bin/activate
    ```

4.  **Install required packages**: Install all the packages included in the backend by typing:

    ```
    pip install -r requirements.txt
    ```

5.  **Create an environment variable**: Create an environmnet variable to hold local secrets and avoid cross-contamination. To do this, create a file **.env** in the **root project folder**. Then add the following secrets to the file:

    ```
    DJANGO_SECRET_KEY=YOUR_SECRET_KEY
    ```

    ```
    DEBUG=True
    ```

6.  **Run the backend**: You are now ready to run the backend by typing:

    ```
    python manage.py runserver
    ```

7. **Run the pre-commit hook**: This will ensure that your code is formatted correctly before committing. To do this, run the following command:
   
    ```
    pre-commit install
    ```

    ```
    pre-commit run --all-files
    ```

8. **Generate secret key**: If you need to generate a new secret key, you can do so by typing:

    ```
    echo SECRET_KEY=$(cat /dev/urandom | LC_ALL=C tr -dc '[:alpha:]'| fold -w 50 | head -n1) >> .env
    ```

### Frontend
In the `frontend` directory, you can run:

#### `npm install`
Install the packages

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Documentation

### [**Website Final Design**](https://www.figma.com/file/I8IKsIv9cJKjsDOAS8lwmt/Figma-basics?type=design&node-id=1669-162202&mode=design&t=FbizdAOID1cRSj0c-0)
only available for people with permissions

### [**API Contract**]()
This is the contract for the frontend and backend, only put the APIs that are already implemented, tested and finalized, please change loggings during the development.


## Style Guide
[Official Django Style Guide](https://docs.djangoproject.com/en/5.0/internals/contributing/writing-code/coding-style/)

Naming convention: Snake case for variables and functions, Camel case for classes
