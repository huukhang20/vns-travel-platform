# Database Configuration Guide

This project supports both SQLite and SQL Server databases. You can easily switch between them by changing the configuration.

## Configuration

### 1. appsettings.json (Production)
```json
{
  "Database": {
    "Type": "SqlServer"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=VNS_Travel;Trusted_Connection=True;TrustServerCertificate=True;",
    "SqlServerConnection": "Server=localhost;Database=VNS_Travel;Trusted_Connection=True;TrustServerCertificate=True;",
    "SqliteConnection": "Data Source=VNS_Travel.db"
  }
}
```

### 2. appsettings.Development.json (Development)
```json
{
  "Database": {
    "Type": "Sqlite"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=VNS_Travel.db",
    "SqlServerConnection": "Server=localhost;Database=VNS_Travel;Trusted_Connection=True;TrustServerCertificate=True;",
    "SqliteConnection": "Data Source=VNS_Travel.db"
  }
}
```

## Switching Database Types

### To Use SQLite:
1. Set `"Database": { "Type": "Sqlite" }` in your configuration
2. Ensure the `SqliteConnection` string points to your desired SQLite file
3. The application will automatically use SQLite

### To Use SQL Server:
1. Set `"Database": { "Type": "SqlServer" }` in your configuration
2. Ensure the `SqlServerConnection` string is correct
3. The application will automatically use SQL Server

## Database Initialization

The application automatically:
- Creates the database if it doesn't exist
- Applies any pending migrations
- Logs the database type and connection status

## Migration Commands

### For SQLite:
```bash
# Create initial migration
dotnet ef migrations add InitialCreate --project DAL --startup-project Presentation

# Apply migrations
dotnet ef database update --project DAL --startup-project Presentation
```

### For SQL Server:
```bash
# Create initial migration
dotnet ef migrations add InitialCreate --project DAL --startup-project Presentation

# Apply migrations
dotnet ef database update --project DAL --startup-project Presentation
```

## Environment Variables

You can also use environment variables to override the configuration:

```bash
# For SQLite
set Database__Type=Sqlite
set ConnectionStrings__DefaultConnection="Data Source=VNS_Travel.db"

# For SQL Server
set Database__Type=SqlServer
set ConnectionStrings__DefaultConnection="Server=localhost;Database=VNS_Travel;Trusted_Connection=True;TrustServerCertificate=True;"
```

## Features

- **Automatic Database Creation**: The database is created automatically if it doesn't exist
- **Migration Support**: Full Entity Framework migration support for both providers
- **Environment-Specific Configurations**: Different settings for development and production
- **Logging**: Comprehensive logging of database operations
- **Error Handling**: Proper error handling for database operations

## Troubleshooting

### Common Issues:

1. **SQLite File Permissions**: Ensure the application has write permissions to the directory where the SQLite file will be created.

2. **SQL Server Connection**: Make sure SQL Server is running and the connection string is correct.

3. **Migration Conflicts**: If you switch between database types, you may need to remove existing migrations and create new ones.

### Reset Database:
```bash
# Remove existing migrations
dotnet ef migrations remove --project DAL --startup-project Presentation

# Create new migration
dotnet ef migrations add InitialCreate --project DAL --startup-project Presentation

# Update database
dotnet ef database update --project DAL --startup-project Presentation
```

## Performance Considerations

- **SQLite**: Better for development and small to medium applications
- **SQL Server**: Better for production applications with high concurrency and complex queries

## Security

- SQLite files should be stored in a secure location
- SQL Server connection strings should use appropriate authentication
- Never commit sensitive connection strings to version control 