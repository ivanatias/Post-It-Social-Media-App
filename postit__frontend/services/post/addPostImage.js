import axios from "axios";

export const addPostImage = (imageFile) => {
  const form = new FormData();
  form.append("uploadedFile", imageFile);
  return axios.post("/api/posts/uploadImage", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
