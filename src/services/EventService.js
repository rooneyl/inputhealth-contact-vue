import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const api2 = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "image/"
  }
});

export const Get = async () => {
  return api.get("/contacts");
};

export const Delete = async (id) => {
  return api.delete("/contacts/" + id);
};

export const Update = async ({ contact, image }) => {
  const payload = {
    id: contact.id,
    city: contact.city,
    email: contact.email,
    gender: contact.gender,
    name: contact.name,
    note: contact.note,
    phone: contact.phone.toString(),
    postalCode: contact.postalCode,
    province: contact.province,
    street: contact.street,
    birthday: contact.birthday,
    tags: contact.tags.length == 0 ? "" : contact.tags.join(",")
  };

  var form_data = new FormData();

  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  if (image) form_data.append("image", image);

  // return api.post("/contacts/", form_data);
  return axios({
    method: "post",
    url: "http://localhost:3000/contacts/",
    data: form_data,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};

export const Post = async ({ contact, image }) => {
  const payload = {
    city: contact.city,
    email: contact.email,
    gender: contact.gender,
    name: contact.name,
    note: contact.note,
    phone: contact.phone.toString(),
    postalCode: contact.postalCode,
    province: contact.province,
    street: contact.street,
    birthday: contact.birthday,
    tags: contact.tags.length == 0 ? "" : contact.tags.join(",")
  };
  var form_data = new FormData();
  for (var key in payload) {
    form_data.append(key, payload[key]);
  }

  if (image) form_data.append("image", image);
  console.log("SEND");
  console.log(image);
  // return api.post("/contacts/", form_data);
  return axios({
    method: "post",
    url: "http://localhost:3000/contacts/",
    data: form_data,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};
