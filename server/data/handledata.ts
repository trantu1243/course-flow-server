import CryptoJS from 'crypto-js';

export function encryptData(data: string, dek: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, dek).toString();
    return encryptedData;
}

export function decryptData(encryptedData: string, dek: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, dek);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}