import uuidv4 from "uuid/v4";

const resolvers = {
    Query: {
        getAllUsers(root, args, { models }) {
            return models.users.findAll();
        },
        getUser(root, args, { models }) {
            return models.users.findOne({where:{id: args.id}});
        }
    },
    Mutation: {
        createUser(root, args, { models }) {
            const newUser =  {
                id: uuidv4(),
                users_username: args.users_username,
                users_email: args.users_email,
                users_password: args.users_password,
                users_role: 'users',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            models.users.create(newUser);
            return newUser;
        }
    }
}


module.exports = resolvers;


