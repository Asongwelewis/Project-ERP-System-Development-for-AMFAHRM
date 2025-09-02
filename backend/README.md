# ERP System Backend

This is the backend for the ERP System, built with Django and Django REST framework.

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Project-ERP-System-Development-for-AMFAHRM/backend
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory with the following variables:
   ```
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=postgres://username:password@localhost:5432/erp_db
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

- Admin: http://localhost:8000/admin/
- API Root: http://localhost:8000/api/
- User Authentication: http://localhost:8000/api/auth/
- User Management: http://localhost:8000/api/accounts/

## Project Structure

```
backend/
├── config/               # Project configuration
├── users/                # Users app
│   ├── migrations/       # Database migrations
│   ├── __init__.py
│   ├── admin.py         # Admin configuration
│   ├── apps.py          # App configuration
│   ├── models.py        # Database models
│   ├── serializers.py   # API serializers
│   ├── urls.py         # URL routing
│   └── views.py        # API views
├── venv/                # Virtual environment
├── .env                 # Environment variables
├── manage.py            # Django management script
└── requirements.txt     # Project dependencies
```

## Development

- Run tests: `python manage.py test`
- Create new app: `python manage.py startapp <app_name>`
- Make migrations: `python manage.py makemigrations`
- Apply migrations: `python manage.py migrate`

## Deployment

For production deployment, make sure to:
1. Set `DEBUG=False` in settings.py
2. Configure proper database settings
3. Set up a production web server (e.g., Gunicorn with Nginx)
4. Set up proper static file handling
5. Configure proper security settings

## License

This project is licensed under the MIT License.
