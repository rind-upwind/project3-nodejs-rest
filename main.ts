import express from "express";

import users from "./data/users";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (request, response) => {
	response.json(users);
});

app.get("/:id", (request, response) => {
	const id = parseInt(request.params.id);
	const user = users.find((user) => user.ID === id);

	if (user) {
		response.json(user);
	} else {
		response.status(404).send("User not found");
	}
});

app.post("/", (request, response) => {
	const newUser = request.body;
	if (!newUser.ID || !newUser.firstName || !newUser.lastName) {
		response.status(400).json({
			error: "Please provide ID, firstName, and lastName",
		});
		return;
	}

	users.push(newUser);
	response.json(newUser);
});

app.put("/:id", (request, response) => {
	const id = parseInt(request.params.id);
	const user = users.find((user) => user.ID === id);

	if (!user) {
		response.status(404).send("User not found");
		return;
	}

	const updatedUser = request.body;
	if (updatedUser.ID) {
		user.ID = updatedUser.ID;
	}
	if (updatedUser.firstName) {
		user.firstName = updatedUser.firstName;
	}
	if (updatedUser.lastName) {
		user.lastName = updatedUser.lastName;
	}

	response.json(user);
});

app.delete("/:id", (request, response) => {
	const id = parseInt(request.params.id);
	const index = users.findIndex((user) => user.ID === id);

	if (index === -1) {
		response.status(404).send("User not found");
		return;
	}

	users.splice(index, 1);
	response.send("User deleted");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
