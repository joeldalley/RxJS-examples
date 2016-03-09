jest.unmock("../FetchUsers");

import * as FetchUsers from "../FetchUsers";

const expectedUsers = 'Caged KirinDave anotherjesse atmos bmizerany brynary defunkt errfree evanphx ezmobius fanvsfan ivey jamesgolick kevinclark kevwil lukas macournoyer mojodna mojombo nitay pjhyett railsjitsu roland takeo technoweenie tomtt topfunky vanpelt wayneeseguin wycats';

describe('Fetch users asynchronously from api.github.com', () => {
  pit('works with async/await', async () => {
    function asPromised() {
      return new Promise((resolve) => {
        const responseStream = FetchUsers.getResponseStream();

        responseStream.subscribe(response => {
          const users = JSON.parse(response).map(_ => _["login"]).sort().join(" ");
          resolve(users);
        });
      })
    }

    let users = await asPromised();
    expect(users).toEqual(expectedUsers);
  });
});
