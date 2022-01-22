import User from '../model/userSchema.js';


export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json( 'User already exist');
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        response.status(200).json(`${user.firstName} has been successfully registered`);
        
    } catch (error) {
        response.json('Error: ', error.message);
    }
}

export const userLoginIn = async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username, password: request.body.password });
        if(user) {
            return response.status(200).json(`${request.body.username}  is successfully registered`);
        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        console.log('Error: ', error.message);        
    }
}


