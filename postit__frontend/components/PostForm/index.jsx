import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImageUploadContainer from "./ImageUpload/ImageUploadContainer";
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
import { addPostImage } from "../../services/post/addPostImage";
import { addPost } from "../../services/post/addPost";
import { editPost } from "../../services/post/editPost";
import { isCorrectImageType } from "../../utils/isCorrectImageType";
import { toast } from "react-toastify";

const PostForm = ({
  postImageToEdit,
  postTitleToEdit,
  postDescriptionToEdit,
  postCategoryToEdit,
  editingPostMode,
  toggleEditingPostMode,
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

  const handleAddPostImage = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    toggleWrongImageType(false);

    if (!isCorrectImageType(selectedFile)) {
      toggleWrongImageType(true);
      setPostImage(null);
      return;
    }

    toggleUploadingImage();

    try {
      const { data: image, status } = await addPostImage(selectedFile);
      if (status !== 200) throw new Error("Error uploading image");
      setPostImage(image);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message);
    } finally {
      toggleUploadingImage();
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!postTitle || !postImage || !postCategory) {
      return showAllFieldsMessage();
    }

    toggleCreatingPost();

    try {
      await addPost({
        postImage,
        postTitle,
        postDescription,
        postCategory,
        userId: session?.user?.uid,
      });
      toast.success("You created a post!");
      router.push("/");
    } catch (err) {
      toast.error(`Error creating post, try again. ${err.message}`);
    } finally {
      toggleCreatingPost();
    }
  };

  const handleEditPost = async (e) => {
    e.preventDefault();

    if (!postTitle || !postCategory) {
      return showAllFieldsMessage();
    }

    toggleisEditingPost();

    try {
      await editPost({ postId: id, postTitle, postDescription, postCategory });
      toast.success("Post edited");
      refresh();
    } catch (err) {
      toast.error(`Error editing post: ${err.message}`);
    } finally {
      toggleisEditingPost();
      toggleEditingPostMode();
    }
  };

  return (
    <>
      <ImageUploadContainer>
        <ImageUpload
          uploadingImage={uploadingImage}
          imageUrl={postImage?.url}
          wrongImageType={wrongImageType}
        />
      </ImageUploadContainer>
      <Form onSubmit={editingPostMode ? handleEditPost : handleAddPost}>
        {!editingPostMode && (
          <FileInput onChange={handleAddPostImage} postImage={postImage} />
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
          {editingPostMode && (
            <CancelButton toggleEditingPostMode={toggleEditingPostMode} />
          )}
        </InputsWrapper>
      </Form>
    </>
  );
};

export default PostForm;
