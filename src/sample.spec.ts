describe("my test", () => {
  it("returns true", () => {
    expect(true).toEqual(true);
  });
});

class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
  }
}

describe("FriendList", () => {
  const friendList = new FriendsList();
  it("initializes friends list", () => {
    expect(friendList.friends.length).toEqual(0);
  });
});
