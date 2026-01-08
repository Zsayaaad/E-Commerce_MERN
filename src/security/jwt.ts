import jwt from 'jsonwebtoken';

export const generateJWT = (data: any) => {
    return jwt.sign(data, 'sk_live_1eS0XRT4yx08eCi1aYUcy0VFwub7r7b8');
}