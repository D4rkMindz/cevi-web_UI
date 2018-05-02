export class AuthenticationFailedException extends Error {
  private msg;

  constructor(message: any) {
    super('Authentication failed');
    this.msg = message;
  }

  /**
   * Get object message
   * @return {any}
   */
  public getParsedMessage() {
    return this.msg;
  }
}
