const db = require("./knex")();
const uuid = require("uuid");

exports.getAllTo_dos = async ({ user_id: user_id }) => {
  try {
    const to_doData = await db("to_do").select("*").where("user_id", user_id);

    if (JSON.stringify(to_doData) === null) {
      throw new ReferenceError();
    }

    return to_doData;
  } catch (error) {
    if (!ReferenceError) throw new Error("Failed to fetch to_dos");
    else throw "Nothing found";
  }
};

exports.createTo_dos = async (user_id, to_do) => {
  try {
    const to_doData = await db("to_do").insert({
      id: uuid.v4(),
      title: to_do[0].title,
      description: to_do[0].description,
      user_id: user_id,
    });

    return to_doData;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.setStatus = async (user_id, to_do) => {
  try {
    let status;
    const to_doD = await this.getTo_dos_byId(to_do, user_id);
    const status_buffer = Buffer.from(to_doD[0].status);
    const status_boolean = Boolean(status_buffer.readInt8());
    if (!status_boolean) {
      status = true;
    } else {
      status = false;
    }

    const to_doData = await db("to_do")
      .update({
        status: status,
      })
      .where("user_id", user_id)
      .where("id", to_doD[0].id);

    return to_doData;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getTo_dos_byId = async (to_do_id, user_id) => {
  try {
    console.log(to_do_id);
    const to_doData = await db("to_do")
      .select("*")
      .where("id", to_do_id[0].id)
      .where("user_id", user_id);

    return to_doData;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateTo_doById = async (to_doData, user_id) => {
  try {
    const updatedData = await db("to_do")
      .update({
        title: to_doData[0].title,
        description: to_doData[0].description,
      })
      .where("id", to_doData[0].id)
      .where("user_id", user_id);

    return updatedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.deleteto_doById = async (to_do_id, user_id) => {
  try {
    const data = await db("to_do")
      .delete("*")
      .where("id", to_do_id[0].id)
      .where("user_id", user_id);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
