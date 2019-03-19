import axios from "axios";

const URL = "http://localhost:3000";

const payloadFactory = (input) => {
  const { contact, image } = input;
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

  if (contact.id) payload.id = contact.id;
  const form_data = new FormData();
  for (var key in payload) {
    form_data.append(key, payload[key]);
  }
  if (image) form_data.append("image", image);

  console.log(form_data);
  return form_data;
};

export const Get = async () => {
  return axios({
    method: "get",
    url: URL + "/contacts/",
    config: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  });
};

export const Delete = async (id) => {
  return axios({
    method: "delete",
    url: URL + "/contacts/" + id,
    config: {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  });
};

export const Update = async (input) => {
  console.log("UPDATE");
  return axios({
    method: "put",
    url: URL + "/contacts/" + input.contact.id,
    data: payloadFactory(input),
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};

export const Post = async (input) => {
  console.log("POST");
  console.log(input);
  return axios({
    method: "post",
    url: URL + "/contacts/",
    data: payloadFactory(input),
    config: { headers: { "Content-Type": "multipart/form-data" } }
  });
};
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: false,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   }
// });

// const api2 = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: false,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "image/"
//   }
// });

// export const Get = async () => {
//   return api.get("/contacts");
// };

// export const Delete = async (id) => {
//   return api.delete("/contacts/" + id);
// };

// export const Update = async ({ contact, image }) => {
//   const payload = {
//     id: contact.id,
//     city: contact.city,
//     email: contact.email,
//     gender: contact.gender,
//     name: contact.name,
//     note: contact.note,
//     phone: contact.phone.toString(),
//     postalCode: contact.postalCode,
//     province: contact.province,
//     street: contact.street,
//     birthday: contact.birthday,
//     tags: contact.tags.length == 0 ? "" : contact.tags.join(",")
//   };

//   var form_data = new FormData();

//   for (var key in payload) {
//     form_data.append(key, payload[key]);
//   }

//   if (image) form_data.append("image", image);

//   // return api.post("/contacts/", form_data);
//   return axios({
//     method: "post",
//     url: "http://localhost:3000/contacts/",
//     data: form_data,
//     config: { headers: { "Content-Type": "multipart/form-data" } }
//   });
// };

// export const Post = async ({ contact, image }) => {
//   const payload = {
//     city: contact.city,
//     email: contact.email,
//     gender: contact.gender,
//     name: contact.name,
//     note: contact.note,
//     phone: contact.phone.toString(),
//     postalCode: contact.postalCode,
//     province: contact.province,
//     street: contact.street,
//     birthday: contact.birthday,
//     tags: contact.tags.length == 0 ? "" : contact.tags.join(",")
//   };
//   var form_data = new FormData();
//   for (var key in payload) {
//     form_data.append(key, payload[key]);
//   }

//   if (image) form_data.append("image", image);
//   console.log(contact);
//   console.log(image);
//   // return api.post("/contacts/", form_data);
//   return axios({
//     method: "post",
//     url: "http://localhost:3000/contacts/",
//     data: form_data,
//     config: { headers: { "Content-Type": "multipart/form-data" } }
//   });
// };
