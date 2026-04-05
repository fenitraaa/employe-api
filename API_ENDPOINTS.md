# Endpoints API Et Formats Des Retours

URL de base : `http://localhost:3000`

Note : tous les endpoints `/api/*` sont protégés et nécessitent :

`Authorization: Bearer <JWT_TOKEN>`

## Endpoints Auth

### POST `/auth/register`
Crée un nouvel utilisateur.

Corps de la requête :
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Réponses :

`201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "<mongo_object_id>",
    "username": "admin"
  }
}
```

`400 Bad Request`
```json
{
  "success": false,
  "message": "Username and password are required"
}
```
ou
```json
{
  "success": false,
  "message": "Username already exists"
}
```

`500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### POST `/auth/login`
Authentifie un utilisateur et retourne un token JWT.

Corps de la requête :
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Réponses :

`200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt_token>"
  }
}
```

`400 Bad Request`
```json
{
  "success": false,
  "message": "Username and password are required"
}
```

`401 Unauthorized`
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

`500 Internal Server Error`
```json
{
  "success": false,
  "message": "JWT_SECRET is not configured"
}
```
ou
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Endpoints Employés (Protégés)

### POST `/api/employees`
Crée un nouvel employé.

Corps de la requête :
```json
{
  "numEmp": 1,
  "nom": "Alice",
  "salaire": 3200
}
```

Réponses :

`201 Created`
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "<mongo_object_id>",
    "numEmp": 1,
    "nom": "Alice",
    "salaire": 3200,
    "obs": "moyen",
    "createdAt": "<date>",
    "updatedAt": "<date>",
    "__v": 0
  }
}
```

`400 Bad Request`
```json
{
  "success": false,
  "message": "<validation_or_duplicate_error_message>"
}
```

`500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### GET `/api/employees`
Retourne la liste des employés.

Réponses :

`200 OK`
```json
{
  "success": true,
  "message": "Employees retrieved successfully",
  "data": [
    {
      "_id": "<mongo_object_id>",
      "numEmp": 1,
      "nom": "Alice",
      "salaire": 3200,
      "obs": "moyen",
      "createdAt": "<date>",
      "updatedAt": "<date>",
      "__v": 0
    }
  ]
}
```

`500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### GET `/api/employees/stats`
Retourne les statistiques des salaires.

Réponses :

`200 OK`
```json
{
  "success": true,
  "message": "Employee salary stats retrieved successfully",
  "data": {
    "totalSalary": 3200,
    "minSalary": 3200,
    "maxSalary": 3200
  }
}
```

Si aucun employé :
```json
{
  "success": true,
  "message": "Employee salary stats retrieved successfully",
  "data": {
    "totalSalary": 0,
    "minSalary": 0,
    "maxSalary": 0
  }
}
```

`500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### PUT `/api/employees/:numEmp`
Met à jour un employé par `numEmp`.

Paramètre de chemin :
- `numEmp` (entier)

Corps de la requête (exemple) :
```json
{
  "nom": "Alice Updated",
  "salaire": 5400
}
```

Réponses :

`200 OK`
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "_id": "<mongo_object_id>",
    "numEmp": 1,
    "nom": "Alice Updated",
    "salaire": 5400,
    "obs": "grand",
    "createdAt": "<date>",
    "updatedAt": "<date>",
    "__v": 0
  }
}
```

`400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid employee number"
}
```
ou
```json
{
  "success": false,
  "message": "<validation_error_message>"
}
```

`404 Not Found`
```json
{
  "success": false,
  "message": "Employee not found"
}
```

`500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### DELETE `/api/employees/:numEmp`
Supprime un employé par `numEmp`.

Paramètre de chemin :
- `numEmp` (entier)

Réponses :

`200 OK`
```json
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": {
    "_id": "<mongo_object_id>",
    "numEmp": 1,
    "nom": "Alice",
    "salaire": 3200,
    "obs": "moyen",
    "createdAt": "<date>",
    "updatedAt": "<date>",
    "__v": 0
  }
}
```

`400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid employee number"
}
```

`404 Not Found`
```json
{
  "success": false,
  "message": "Employee not found"
}
```

`500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Format D'erreur Du Middleware Auth (routes protégées)

Si le token est manquant/invalide/expiré, le middleware retourne :

`401 Unauthorized`
```json
{
  "message": "Access denied. Token missing."
}
```
ou
```json
{
  "message": "Invalid or expired token"
}
```
