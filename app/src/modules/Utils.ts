export class String{
    static isEmpty(value: string): boolean {
        return value === ''|| !value;
    }
    static isValidEmail(value: string): boolean {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }
    static isValidPassword(value: string): boolean {
        return value.length >= 6;
    }
    static isValidName(value: string): boolean {
        return value.length >= 2;
    }
}