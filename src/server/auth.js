import jwt from "jsonwebtoken";

export const auth = async (ctx, token, role) => {
    if (ctx.request.header.authorization) {
        const decode = await jwt.verify(
            ctx.request.header.authorization,
            token
        );
        if (role.includes(decode.role) || role == "all" ) {
            return decoded;
        } else {
            throw new Error("unauthorised for " + decode.role + "user")
        }
    } else { 
        throw new Error('Please log in ')
    }
};
