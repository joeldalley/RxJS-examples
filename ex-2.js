const Rx = require("rx");
const rp = require("request-promise");

const rpOpts = {
  headers: {'User-Agent': 'Request-Promise'}
};

const urlStream = Rx.Observable.just('https://api.github.com/users');

{ // Without flatMap.
  const responseMetaStream = urlStream.map(uri => {
    const reqOpts = Object.assign(rpOpts, {uri: uri});
    return Rx.Observable.fromPromise(rp(reqOpts));
  });

  responseMetaStream.subscribe(responseStream => {
    responseStream.subscribe(response => {
        const users = JSON.parse(response);
        console.log(users.map(_ => _["login"]).join(" "));
    });
  });
}

{ // With flapMap -- No unzippering required.
  const responseStream = urlStream.flatMap(uri => {
    const reqOpts = Object.assign(rpOpts, {uri: uri});
    return Rx.Observable.fromPromise(rp(reqOpts));
  });

  responseStream.subscribe(response => {
    const users = JSON.parse(response);
    console.log(users.map(_ => _["login"]).join(" "));
  });
}
