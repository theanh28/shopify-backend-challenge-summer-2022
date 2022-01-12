db.createUser(
  {
    user: "tester",
    pwd: "passwd",
    roles: [
      {
        role: "readWrite",
        db  : "spf",
      }
    ]
  }
)