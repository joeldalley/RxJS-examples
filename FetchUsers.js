import { Observable } from "rx";
const rp = require("request-promise");

const rpOpts = {
  headers: {"User-Agent": "Request-Promise"}
};

const urlStream = Observable.just("https://api.github.com/users");

export function getResponseStream() { 
  return urlStream.flatMap(uri => {
    const reqOpts = Object.assign(rpOpts, {uri: uri});
    return Observable.fromPromise(rp(reqOpts));
  });
}
