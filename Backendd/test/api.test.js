// const request = require("supertest");
// const app = require("../server"); // Make sure this path is correct!

// describe("API Tests", () => {
//   let token;
//   let id;

//   test("Login with valid credentials", async () => {
//     const res = await request(app)
//       .post("/login")
//       .send({ username: "testuser", password: "password" });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.token).toBeDefined();
//     token = res.body.token;
//   });

//   test("Create a new item", async () => {
//     const res = await request(app)
//       .post("/items")
//       .set("Authorization", `Bearer ${token}`) // optional if auth needed
//       .send({ task: "New Task" });

//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("id");
//     expect(res.body.task).toBe("New Task");
//     id = res.body.id;
//   });

//   test("Get items", async () => {
//     const res = await request(app)
//       .get("/items")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   test("Update item", async () => {
//     const res = await request(app)
//       .put(`/items/${id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({ task: "Updated Task" });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.task).toBe("Updated Task");
//   });

//   test("Delete item", async () => {
//     const res = await request(app)
//       .delete(`/items/${id}`)
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toBe(204);
//   });
// });

const request = require("supertest");
//const app = require("../app");
const app = require("../server");

describe("API Tests", () => {
  // ✅ Positive test cases
  test("Login with valid credentials", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "password" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBe("dummy-token");
  });

  test("Create a new item", async () => {
    const res = await request(app).post("/items").send({ task: "Test task" });
    expect(res.statusCode).toBe(201);
    expect(res.body.task).toBe("Test task");
  });

  test("Get items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Update item", async () => {
    const createRes = await request(app)
      .post("/items")
      .send({ task: "Old task" });
    const id = createRes.body.id;

    const updateRes = await request(app)
      .put(`/items/${id}`)
      .send({ task: "Updated task" });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.task).toBe("Updated task");
  });

  test("Delete item", async () => {
    const createRes = await request(app)
      .post("/items")
      .send({ task: "To delete" });
    const id = createRes.body.id;

    const deleteRes = await request(app).delete(`/items/${id}`);
    expect(deleteRes.statusCode).toBe(204);
  });

  // ❌ Negative test cases
  test("Login with invalid credentials", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "wrong", password: "wrong" });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Invalid credentials");
  });

  test("Create item without task", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Task is required");
  });

  test("Update non-existent item", async () => {
    const res = await request(app).put("/items/9999").send({ task: "update" });

    expect(res.statusCode).toBe(404);
  });

  test("Delete non-existent item", async () => {
    const res = await request(app).delete("/items/9999");
    expect(res.statusCode).toBe(204); // or 404 if you want to change behavior
  });
});
