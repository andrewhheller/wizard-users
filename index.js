let users = [
  {id: 1, name: 'Harry'},
  {id: 2, name: 'Hermoine'},
  {id: 3, name: 'Neville'}
]

// find all users (preserve data)
const findAllUsers = () => {
  return users;
}

const findUser = (id) => users.find(user => user.id === id);

const createUser = name => {
x
  // determine max user ID
  let maxId = users.reduce((max, user) => {

    if(user.id > max) {
      max = user.id;
    }

  return max;

  }, 0);

  // create new user object
  // increment maxId to 1 (setting next available ID)
  const newUser = {id: ++maxId, name};

  // add new user to users array
  users.push(newUser);

  // return newly created user
  return newUser;

}

const resetUsers = () => {

  // recreate user array to original object userrs
  users = [
    {id: 1, name: 'Harry'},
    {id: 2, name: 'Hermoine'},
    {id: 3, name: 'Neville'}
  ];

}

const deleteUser = (id) => {
  users = users.filter(user => user.id !== id);
}

// console.log(findAllUsers());

// console.log(findUser(1));

// console.log(createUser('Ronald'));

// createUser('Ronald');

// resetUsers();

// console.log(users);

// deleteUser(1);
console.log(users);

module.exports = {
  findAllUsers,
  findUser,
  createUser,
  deleteUser
}
