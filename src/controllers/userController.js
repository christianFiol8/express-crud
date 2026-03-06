let users = [
  {
    id: 1,
    email: 'alice@example.com',
    password: '123456',
    name: 'Alice García',
    birthdate: '1995-04-23',
  },
  {
    id: 2,
    email: 'bob@example.com',
    password: 'abcdef',
    name: 'Bob Martínez',
    birthdate: '1990-11-08',
  },
];
let nextId = 3;

function sanitizeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

function getAllUsers(req, res) {
  res.status(200).json({
    success: true,
    total: users.length,
    data: users.map(sanitizeUser),
  });
}

function getUserById(req, res) {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: `Usuario ${id} no encontrado.` });
  }

  res.status(200).json({ success: true, data: sanitizeUser(user) });
}

function createUser(req, res) {
  const { email, password, name, birthdate } = req.body;

  // Todos los campos son requeridos
  if (!email || !password || !name || !birthdate) {
    return res.status(400).json({
      success: false,
      message: 'Los campos email, password, name y birthdate son requeridos.',
    });
  }

  // Validación formato YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthdate)) {
    return res.status(400).json({
      success: false,
      message: 'El campo birthdate debe tener el formato YYYY-MM-DD.',
    });
  }

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(409).json({ success: false, message: `El email "${email}" ya está registrado.` });
  }

  const newUser = { id: nextId++, email, password, name, birthdate };
  users.push(newUser);

  res.status(201).json({ success: true, message: 'Usuario creado.', data: sanitizeUser(newUser) });
}

function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Usuario ${id} no encontrado.` });
  }

  const { email, password, name, birthdate } = req.body;

  //Validación formato
  if (birthdate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthdate)) {
      return res.status(400).json({
        success: false,
        message: 'El campo birthdate debe tener el formato YYYY-MM-DD.',
      });
    }
  }

  users[index] = {
    ...users[index],
    ...(email && { email }),
    ...(password && { password }),
    ...(name && { name }),
    ...(birthdate && { birthdate }),
  };

  res.status(200).json({ success: true, message: 'Usuario actualizado.', data: sanitizeUser(users[index]) });
}

function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Usuario ${id} no encontrado.` });
  }

  const deleted = users.splice(index, 1)[0];
  res.status(200).json({ success: true, message: `Usuario "${deleted.name}" eliminado.`, data: sanitizeUser(deleted) });
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };