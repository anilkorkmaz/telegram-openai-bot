export default class EnvNotFoundException extends Error {
    constructor(name){
        super(name);
        this.message = `${name} not found in environment variables`;
    }
}
