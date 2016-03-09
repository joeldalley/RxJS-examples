import { Observable } from "rx";
import { rp } from "request-promise";

const rpOpts = {
  headers: {"User-Agent": "Request-Promise"}
};

const urlStream = Observable.just("https://api.github.com/users");

function responseSubscriber(responseStream) {
  responseStream.subscribe(response => {
      const users = JSON.parse(response);
      return users.map(_ => _["login"]).sort().join(" ");
  });
}


////////////////////////////////////////////////////


export function subscriber1() { 
  const responseMetaStream = urlStream.map(uri => {
    const reqOpts = Object.assign(rpOpts, {uri: uri});
    return Observable.fromPromise(rp(reqOpts));
  });

  return responseMetaStream.subscribe(responseSubscriber);
}

export function subscriber2() { 
  const responseStream = urlStream.flatMap(uri => {
    const reqOpts = Object.assign(rpOpts, {uri: uri});
    return Observable.fromPromise(rp(reqOpts));
  });

  return responseSubscriber(responseStream);
}
