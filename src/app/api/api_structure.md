- [ ] login / register

- [ ] forum post:

  - [ ] get (all)
  - [ ] get (postID)
  - [ ] post
  - [ ] put comments

- [ ] search:

  - [ ] get (with different filters)
  - [ ] get (programID)

- [ ] uni application:
  - [ ] get (all)
  - [ ] get (applicationID)
  - [ ] post (forum post)
  - [ ] put
- [ ] comment:

  - [ ] post
  - [ ] get (all)
  - [ ] put

- [ ] friend:

  - [ ] post (to add and accept)

- [ ] docs:

  - [ ] post
  - [ ] get (all)
  - [ ] get (docID)
  - [ ] delete

- [ ] uni programs (admin only):

  - [ ] get (all and ID)
  - [ ] post
  - [ ] put
  - [ ] delete

- [ ]

pages/
└── api/
    ├── users/
    │   ├── index.js  // Handles GET for listing all users and POST for creating a new user
    │   └── [id].js   // Handles GET, PUT, DELETE for a specific user by ID
    │   └── login.js  // Handles POST for user login
    │   └── logout.js // Handles POST for user logout
    │
    ├── accounts/
    │   ├── index.js  // Handles GET for listing all accounts (if needed)
    │   └── [userId]/
    │       └── index.js // Handles GET and POST for accounts related to a specific user
    │
    ├── sessions/
    │   ├── index.js  // Handles GET for listing all sessions (Admin only)
    │   └── [id].js   // Handles DELETE for invalidating a specific session
    │
    ├── universities/
    │   ├── index.js  // Handles GET for listing all universities and POST for creating a new university
    │   └── [id].js   // Handles GET, PUT, DELETE for a specific university by ID
    │
    ├── study-programs/
    │   ├── index.js  // Handles GET for listing all study programs and POST for creating a new one
    │   └── [id].js   // Handles GET, PUT, DELETE for a specific study program by ID
    │
    ├── disciplines/
    │   ├── index.js  // Handles GET for listing all disciplines and POST for creating a new one
    │   └── [id].js   // Handles GET, PUT, DELETE for a specific discipline by ID
    │
    └── applications/
        ├── index.js  // Handles GET for listing all applications and POST for creating a new one
        └── [id].js   // Handles GET, PUT, DELETE for a specific application by ID
        └── [applicationId]/
            ├── forms/
            │   └── index.js  // Handles POST for adding a new form to an application
            └── documents/
                └── index.js  // Handles POST for adding a new document to an application
