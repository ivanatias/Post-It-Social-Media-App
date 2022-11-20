import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/router";
import { useField } from "../../hooks/useField";
import { useToggle } from "../../hooks/useToggle";
import { useSession } from "next-auth/react";
import { categories } from "../../utils/data";
import { isCorrectImageType } from "../../utils/isCorrectImageType";
import { toast } from "react-toastify";
import axios from "axios";

const CreatePostForm = ({
  postImageToEdit,
  postTitleToEdit,
  postDescriptionToEdit,
  postCategoryToEdit,
  editingPostMode,
  setEditingPostMode,
  refresh,
}) => {
  const { data: session } = useSession();

  const { value: postTitle, handleValueChange: handlePostTitleChange } =
    useField(postTitleToEdit ?? "");

  const { value: postDescription, handleValueChange: handlePostDescChange } =
    useField(postDescriptionToEdit ?? "");

  const { value: postCategory, handleValueChange: handlePostCategoryChange } =
    useField(postCategoryToEdit ?? "");

  const [postImage, setPostImage] = useState(postImageToEdit ?? null);

  const { value: uploadingImage, toggleValue: toggleUploadingImage } =
    useToggle();

  const { value: wrongImageType, toggleValue: toggleWrongImageType } =
    useToggle();

  const { value: allFields, toggleValue: toggleAllFields } = useToggle();

  const { value: creatingPost, toggleValue: toggleCreatingPost } = useToggle();

  const { value: isEditingPost, toggleValue: toggleisEditingPost } =
    useToggle();

  const router = useRouter();
  const { id } = router.query;

  const showAllFieldsMessage = () => {
    toggleAllFields();
    setTimeout(() => {
      toggleAllFields();
    }, 4000);
  };

  const addPostImage = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    toggleWrongImageType(false);

    if (!isCorrectImageType(selectedFile)) {
      toggleWrongImageType(true);
      setPostImage(null);
      return;
    }

    toggleUploadingImage();
    const form = new FormData();
    form.append("uploadedFile", selectedFile);
    axios
      .post("/api/posts/uploadImage", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        if (data.status === 200) {
          const results = data.data;
          setPostImage(results);
          toggleUploadingImage();
          toast.success("Image uploaded!");
        } else {
          toggleUploadingImage();
          toast.error("Error uploading image, try again.");
        }
      })
      .catch((error) => {
        toggleUploadingImage();
        toast.error(`Error uploading image ${error.message}`);
      });
  };

  const addPost = (e) => {
    e.preventDefault();
    if (!postTitle || !postImage || !postCategory) {
      return showAllFieldsMessage();
    } else {
      toggleCreatingPost();
      axios
        .post("/api/posts/createPost", {
          postImage: postImage,
          postTitle: postTitle,
          postDescription: postDescription,
          postCategory: postCategory,
          userId: session?.user?.uid,
        })
        .then(() => {
          toast.success("You created a post!");
          toggleCreatingPost();
          router.push("/");
        })
        .catch((error) => {
          toggleCreatingPost();
          toast.error(`Error creating post, try again. ${error.message}`);
        });
    }
  };

  const editPost = (e) => {
    e.preventDefault();
    if (!postTitle || !postCategory) {
      return showAllFieldsMessage();
    }
    toggleisEditingPost();
    axios
      .post("/api/posts/editPost", {
        postId: id,
        postTitle: postTitle,
        postDescription: postDescription,
        postCategory: postCategory,
      })
      .then(() => {
        toast.success("Post edited");
        toggleisEditingPost();
        refresh();
        setEditingPostMode(false);
      })
      .catch((error) => {
        toggleisEditingPost();
        toast.error(`Error editing post: ${error.message}`);
      });
  };

  return (
    <>
      <ImageUpload
        uploadingImage={uploadingImage}
        imageUrl={postImage?.url}
        wrongImageType={wrongImageType}
      />
      <form
        onSubmit={editingPostMode ? editPost : addPost}
        className="flex flex-col items-center w-full gap-8"
      >
        {!editingPostMode && (
          <div className="flex flex-col items-center">
            <label
              htmlFor="upload-image"
              className="text-gray-100 hover:text-white hover:border-white border-[1px] rounded-lg border-gray-100 px-4 py-1 transition duration-150 text-sm 2xl:text-base cursor-pointer"
            >
              {postImage ? "Replace image" : "Upload image"}
            </label>
            <input
              type="file"
              name="upload-image"
              id="upload-image"
              className="w-0 h-0"
              onChange={addPostImage}
            />
          </div>
        )}
        {allFields && (
          <p className="text-sm text-center text-red-500 2xl:text-base">
            Please fill all required fields.
          </p>
        )}
        <div className="flex flex-col w-full max-w-2xl gap-8">
          <input
            type="text"
            className="border-[1px] border-gray-100 outline-none p-4 text-white placeholder:text-gray-400 bg-transparent rounded-lg"
            placeholder="Post title"
            value={postTitle}
            onChange={handlePostTitleChange}
          />
          <textarea
            className="max-h-[300px] overflow-y-auto min-h-[150px] border-[1px] border-gray-100 outline-none p-4 text-white placeholder:text-gray-400 bg-transparent rounded-lg"
            rows={4}
            placeholder="What's your post about?"
            value={postDescription}
            onChange={handlePostDescChange}
          />
          <select
            className="p-3 border-[1px] border-gray-100 rounded-lg bg-transparent text-gray-400"
            onChange={handlePostCategoryChange}
          >
            <option
              value=""
              disabled
              selected={postCategoryToEdit ? false : true}
              hidden
            >
              Select a category
            </option>
            {categories.map((category, index) => (
              <option
                key={category.name + index}
                value={category.name}
                className="text-black"
                selected={postCategoryToEdit === category.name}
              >
                {category.name}
              </option>
            ))}
          </select>
          <button
            disabled={
              uploadingImage || creatingPost || wrongImageType || isEditingPost
            }
            type="submit"
            className="flex items-center justify-center w-full px-2 py-4 text-base font-bold text-white transition duration-150 bg-red-500 border-none rounded-sm outline-none 2xl:text-lg hover:bg-red-700 disabled:opacity-40"
          >
            {isEditingPost
              ? "Editing post..."
              : editingPostMode
              ? "Edit Post"
              : creatingPost
              ? "Creating post..."
              : "Create Post"}
          </button>
          {editingPostMode && (
            <button
              type="button"
              className="flex items-center justify-center w-full text-base text-gray-300 transition duration-150 2xl:text-lg hover:text-white"
              onClick={() => setEditingPostMode(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreatePostForm;
