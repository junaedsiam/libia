export class InvalidArgError extends Error {
  constructor(message?: string) {
    super(message || "Invalid argument");
    this.name = "InvalidArgError";
  }
}
