export default class ArgumentError extends Error {
    constructor(msg) {
        super(`ArgumentError: ${msg}`);
    }
}
