jest.autoMockOff();

import * as FetchUsers from "../FetchUsers.js";

describe('Fetch users asynchronously from api.github.com', () => {
  pit('works with async/await', async () => {
    const userNames = await FetchUsers.subscriber2();
    console.log(userNames);
  });
});
