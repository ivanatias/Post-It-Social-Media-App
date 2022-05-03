import axios from "axios";

export const apiUserLogin = async (userName, userId, userImage) => {
  try {
    axios.post(
      `/api/users/login?name=${userName}&googleId=${userId}&imageUrl=${userImage}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const apiGetUser = async (userId) => {
  try {
    const response = await axios.post(`/api/users/getUser?googleId=${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
