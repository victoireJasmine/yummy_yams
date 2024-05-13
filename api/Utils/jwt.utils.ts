import jwt from 'jsonwebtoken';
import { CustomRequest, CustomResponse } from '../type';
const SECRET_KEY = 'votre_secret_ici';

export class JwtFactoryUtils {
    static generateToken(payload: {id:string}): string {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    }
    static parseAutorizationHeader(header: string | null): string | null{
       return header !== null ? header.replace('Bearer ', '') : null;
    }
    static verifyToken(token: string | null): string |null{
        let user : string| null = null;
        const tokenParsed = JwtFactoryUtils.parseAutorizationHeader(token);
        if(!!tokenParsed){
            try{
                const jwtoken = jwt.verify(tokenParsed, SECRET_KEY);
                console.log(jwtoken);
             if(!!jwtoken && typeof jwtoken === 'object' && 'id' in jwtoken){
                user = jwtoken.id;
             }
            }
            catch(e){
                //console.error(e);
                
            }
        } 
        return user;
    }
    static passeport = (req: CustomRequest, res: CustomResponse, next: any) => {
        const token = req.headers.authorization;
        const user = JwtFactoryUtils.verifyToken(token??null);
        if(!!user){
            req.user = {id:user};
            next();
        }else{
            res.status(401).json({message:'Unauthorized'});
        }
    }
}