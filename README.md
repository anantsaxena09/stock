# Stock Management System

## Overview

This is a full-stack web application for managing stocks. It allows users to add, view, edit, and delete stock records. The backend is built with Django REST Framework, and the frontend is implemented using HTML, CSS, and JavaScript. PostgreSQL is used as the database.

## Features

- **Add** new stocks with name, ticker symbol, and price.
- **View** a list of stocks.
- **Edit** existing stocks.
- **Delete** stocks.
- Handle unique ticker symbols with appropriate error messages.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/anantsaxena09/stock.git
    cd your-repository
    ```

2. **Set up a virtual environment:**

    ```bash
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```

3. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure PostgreSQL:**

    Ensure PostgreSQL is installed and running. Create a database and user for the project:

    ```bash
    sudo -u postgres psql
    CREATE DATABASE stock_management;
    CREATE USER youruser WITH PASSWORD 'yourpassword';
    ALTER ROLE youruser SET client_encoding TO 'utf8';
    ALTER ROLE youruser SET default_transaction_isolation TO 'read committed';
    ALTER ROLE youruser SET timezone TO 'UTC';
    GRANT ALL PRIVILEGES ON DATABASE stock_management TO youruser;
    ```

5. **Update Django settings:**

    Modify `settings.py` to configure PostgreSQL:

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'stock_management',
            'USER': 'youruser',
            'PASSWORD': 'yourpassword',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```

6. **Run migrations:**

    ```bash
    python manage.py migrate
    ```

7. **Create a superuser (if needed):**

    ```bash
    python manage.py createsuperuser
    ```

8. **Run the development server:**

    ```bash
    python manage.py runserver
    ```

## Frontend Setup

1. Navigate to the stocks directory:

    ```bash
    cd stocks
    ```

2. Ensure all static files are properly collected:

    ```bash
    python manage.py collectstatic
    ```

## Usage

- Navigate to [http://localhost:8000/](http://localhost:8000/) in your web browser.
- Add new stocks using the form provided.
- View, edit, and delete stocks from the list.
- Toggle visibility of stocks using the button provided.
