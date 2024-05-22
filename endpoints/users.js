export default {
  path: "/users",
  method: "GET",
  authRequired: false,
  run: async (req, res, mongo_client, issuerClient) => {
    const db = mongo_client.db("DiscordServer");
    const collection = db.collection("RecordedRobloxKeys");
    const result = await collection.find({}).toArray();

    let ids = [];

    for (let i = 0; i < result.length; i++) {
      let keysWithoutPrefix = result[i].keys.map((key) =>
        key.replace("MAIN_", "")
      );
      ids.push(...keysWithoutPrefix);
    }

    // get the smallest number in the array, but theyre all strings that need to be converted to numbers
    ids = ids.map((id) => parseInt(id));
    ids = ids.sort((a, b) => a - b);
    console.log(ids[0], ids[ids.length - 1]);

    // combine all the ids into 1 string and get the length of that string
    ids = ids.join("");
    console.log(ids.length);

    res.status(200).json({
      total_users: ids.length,
      ids: ids,
    });
  },
};
