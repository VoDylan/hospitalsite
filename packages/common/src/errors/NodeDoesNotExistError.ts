export class NodeDoesNotExistError extends Error {
  public message: string;
  public name: string = "NODE_DOES_NOT_EXIST_ERROR";

  constructor(message: string) {
    super();
    this.message = message;
  }
}
