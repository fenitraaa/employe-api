le $TOKEN soloinlah anle token azo amle api login

# 1) Register
curl -X POST "http://localhost:3000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin1",
    "password": "admin123"
  }'

# 2) Login (copy token from response)
curl -X POST "http://localhost:3000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'

# 3) Create employee
curl -X POST "http://localhost:3000/api/employees" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "numEmp": 1,
    "nom": "Alice",
    "salaire": 3200
  }'

# 4) Get all employees
curl -X GET "http://localhost:3000/api/employees" \
  -H "Authorization: Bearer $TOKEN"

# 5) Stats
curl -X GET "http://localhost:3000/api/employees/stats" \
  -H "Authorization: Bearer $TOKEN"

# 6) Salary distribution
curl -X GET "http://localhost:3000/api/employees/salaryDistribution" \
  -H "Authorization: Bearer $TOKEN"

# 7) Update employee (replace EMPLOYEE_ID)
EMPLOYEE_ID="PUT_EMPLOYEE_ID_HERE"
curl -X PUT "http://localhost:3000/api/employees/$EMPLOYEE_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nom": "Alice Updated",
    "salaire": 5400
  }'

# 8) Delete employee (replace EMPLOYEE_ID)
curl -X DELETE "http://localhost:3000/api/employees/$EMPLOYEE_ID" \
  -H "Authorization: Bearer $TOKEN"
