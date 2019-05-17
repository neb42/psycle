import Request, {
  uri,
  uuid,
  alphabetic,
  alphabeticAndHyphen,
  alphabeticAndUnderscore,
  numeric,
  pass,
} from './Request';
import ResponseError from './ResponseError';

Request.uri = uri;
Request.uuid = uuid;
Request.alphabetic = alphabetic;
Request.alphabeticAndHyphen = alphabeticAndHyphen ;
Request.alphabeticAndUnderscore = alphabeticAndUnderscore;
Request.numeric = numeric;
Request.pass = pass;

Request.ResponseError = ResponseError;

export default Request;
