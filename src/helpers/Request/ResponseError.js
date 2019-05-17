// @flow

export default class ResponseError extends Error {
  name: string;
  statusCode: number;
  response: Response;

  constructor(response: Response) {
    super(`${response.status} ${response.statusText}`);
    this.name = '[http-status-error]';
    this.statusCode = response.status;
    this.response = response;
  }
}
