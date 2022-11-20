import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import Form from "./FormElements/Form";
import InputsWrapper from "./FormElements/InputsWrapper";
import AllFieldsText from "./FormElements/AllFieldsText";
import CancelButton from "./FormElements/CancelButton";
import FileInput from "./FormElements/FileInput";
import SelectInput from "./FormElements/SelectInput";
import SubmitButton from "./FormElements/SubmitButton";
import TextInputs from "./FormElements/TextInputs";
import { useRouter } from "next/router";
import { useField } from "../../hooks/useField";
import { useToggle } from "../../hooks/useToggle";
import { useSession } from "next-auth/react";
import { isCorrectImageType } from "../../utils/isCorrectImageType";
import { toast } from "react-toastify";
import axios from "axios";

const PostForm = ({
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
      <Form onSubmit={editingPostMode ? editPost : addPost}>
        {!editingPostMode && (
          <FileInput onChange={addPostImage} postImage={postImage} />
        )}
        {allFields && <AllFieldsText />}
        <InputsWrapper>
          <TextInputs
            postTitle={postTitle}
            handlePostTitleChange={handlePostTitleChange}
            postDescription={postDescription}
            handlePostDescChange={handlePostDescChange}
          />
          <SelectInput
            postCategoryToEdit={postCategoryToEdit}
            handlePostCategoryChange={handlePostCategoryChange}
          />
          <SubmitButton
            uploadingImage={uploadingImage}
            creatingPost={creatingPost}
            wrongImageType={wrongImageType}
            isEditingPost={isEditingPost}
            editingPostMode={editingPostMode}
          />
          <CancelButton setEditingPostMode={setEditingPostMode} />
        </InputsWrapper>
      </Form>
    </>
  );
};

export default PostForm;
