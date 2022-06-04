import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { categories } from "../utils/data";
import { AiOutlineUpload } from "react-icons/ai";
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
  const [postTitle, setPostTitle] = useState(postTitleToEdit || "");
  const [postDescription, setPostDescription] = useState(
    postDescriptionToEdit || ""
  );
  const [postImage, setPostImage] = useState(postImageToEdit || null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [postCategory, setPostCategory] = useState(postCategoryToEdit || "");
  const [wrongImageType, setWrongImageType] = useState(false);
  const [allFields, setAllFields] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const showAllFieldsMessage = () => {
    setAllFields(true);
    setTimeout(() => {
      setAllFields(false);
    }, 4000);
  };

  const addPostImage = (e) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setUploadingImage(true);
      const form = new FormData();
      form.append("uploadedFile", selectedFile);
      axios
        .post("/api/posts/uploadImage", form)
        .then((data) => {
          if (data.statusText === "OK") {
            const results = data.data;
            setPostImage(results);
            setUploadingImage(false);
            toast.success("Image uploaded!");
          } else {
            setUploadingImage(false);
            toast.error("Error uploading image, try again.");
          }
        })
        .catch((error) => {
          setUploadingImage(false);
          toast.error(`Error uploading image ${error.message}`);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const addPost = (e) => {
    e.preventDefault();
    if (!postTitle || !postImage || !postCategory) {
      showAllFieldsMessage();
      return;
    } else {
      setCreatingPost(true);
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
          setCreatingPost(false);
          router.push("/");
        })
        .catch((error) => {
          setCreatingPost(false);
          toast.error(`Error creating post, try again. ${error.message}`);
        });
    }
  };

  const editPost = (e) => {
    e.preventDefault();
    setIsEditingPost(true);
    axios
      .post("/api/posts/editPost", {
        postId: id,
        postTitle: postTitle,
        postDescription: postDescription,
        postCategory: postCategory,
      })
      .then(() => {
        toast.success("Post edited");
        setIsEditingPost(false);
        refresh();
        setEditingPostMode(false);
      })
      .catch((error) => {
        setIsEditingPost(false);
        toast.error(`Error editing post: ${error.message}`);
      });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div
          className={`relative w-full mt-5 h-[450px] max-w-2xl rounded-2xl border-2 border-gray-300 flex flex-col items-center justify-center bg-transparent`}
        >
          {uploadingImage ? (
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-sm 2xl:text-base font-bold">
                Uploading...
              </p>
              <p className="text-gray-400 text-xs 2xl:text-sm mt-2">
                Please wait for a few seconds
              </p>
            </div>
          ) : postImage && !wrongImageType ? (
            <Image
              src={postImage?.url}
              placeholder="blur"
              blurDataURL={postImage?.url}
              layout="fill"
              alt="Image uploaded by user"
              className="rounded-2xl"
              objectFit="contain"
            />
          ) : (
            <>
              <div className="flex flex-col items-center">
                {wrongImageType ? (
                  <p className="text-red-500 text-sm 2xl:text-base text-center">
                    Please select an image with the correct format.
                  </p>
                ) : (
                  <>
                    <AiOutlineUpload fontSize={150} className="text-gray-100" />
                    <p className="text-gray-400 text-sm 2xl:text-base text-center">
                      You can upload an image with a JPEG, PNG, GIF, SVG, or
                      TIFF format.
                    </p>
                    <p className="mt-5 text-gray-400 font-bold text-xs 2xl:text-sm">
                      High Quality images with less than 20MB are recommended.
                    </p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <form
        onSubmit={editingPostMode ? editPost : addPost}
        className="w-full flex flex-col gap-8 items-center"
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
          <p className="text-center text-red-500 text-sm 2xl:text-base">
            Please fill all required fields.
          </p>
        )}
        <div className="w-full flex flex-col max-w-2xl gap-8">
          <input
            type="text"
            className="border-[1px] border-gray-100 outline-none p-4 text-white placeholder:text-gray-400 bg-transparent rounded-lg"
            placeholder="Post title"
            value={postTitle || ""}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <textarea
            className="max-h-[300px] overflow-y-auto min-h-[150px] border-[1px] border-gray-100 outline-none p-4 text-white placeholder:text-gray-400 bg-transparent rounded-lg"
            rows={4}
            placeholder="What's your post about?"
            value={postDescription || ""}
            onChange={(e) => setPostDescription(e.target.value)}
          />
          <select
            className="p-3 border-[1px] border-gray-100 rounded-lg bg-transparent text-gray-400"
            onChange={(e) => setPostCategory(e.target.value)}
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
                selected={postCategoryToEdit === category.name ? true : false}
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
            className="w-full rounded-sm text-base 2xl:text-lg text-white font-bold border-none outline-none bg-red-500 px-2 py-4 flex items-center justify-center transition duration-150 hover:bg-red-700 disabled:opacity-40"
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
              className="w-full text-base 2xl:text-lg text-gray-300 hover:text-white transition duration-150 flex items-center justify-center"
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
