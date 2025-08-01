import crypto from 'crypto';

export const generateMarvelHash = (timestamp: string, privateKey: string, publicKey: string) => {
    const content = timestamp + privateKey + publicKey;
    return crypto.createHash('md5').update(content).digest('hex');
};
