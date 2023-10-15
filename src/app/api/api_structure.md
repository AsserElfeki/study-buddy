
app/
└── api/
    ├── users/
    │   ├── route.ts  // Handles GET for listing all users and POST for creating a new user
    │   └── [id].ts   // Handles GET, PUT, DELETE for a specific user by ID
    │   └── login.ts  // Handles POST for user login
    │   └── logout.ts // Handles POST for user logout
    │
    ├── accounts/
    │   ├── route.ts  // Handles GET for listing all accounts (if needed)
    │   └── [userId]/
    │       └── route.ts // Handles GET and POST for accounts related to a specific user
    │
    ├── sessions/
    │   ├── route.ts  // Handles GET for listing all sessions (Admin only)
    │   └── [id].ts   // Handles DELETE for invalidating a specific session
    │
    ├──√ universities/
    │   ├── route.ts  // Handles GET for listing all universities and POST for creating a new university
    │   └── [id].ts   // Handles GET, PUT, DELETE for a specific university by ID
    │
    ├── study-programs/
    │   ├── route.ts  // Handles GET for listing all study programs and POST for creating a new one
    │   └── [id].ts   // Handles GET, PUT, DELETE for a specific study program by ID
    │
    ├── disciplines/
    │   ├── route.ts  // Handles GET for listing all disciplines and POST for creating a new one
    │   └── [id].ts   // Handles GET, PUT, DELETE for a specific discipline by ID
    │
    └── applications/
        ├── route.ts  // Handles GET for listing all applications and POST for creating a new one
        └── [id].ts   // Handles GET, PUT, DELETE for a specific application by ID
        └── [applicationId]/
            ├── forms/
            │   └── route.ts  // Handles POST for adding a new form to an application
            └── documents/
                └── route.ts  // Handles POST for adding a new document to an application
