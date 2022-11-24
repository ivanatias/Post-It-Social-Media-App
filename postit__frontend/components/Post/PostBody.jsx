import React from "react";
import Image from "next/image";

const PostBody = ({ postImageUrl, postTitle }) => (
  <>
    <div className="relative post__image-container">
      {postImageUrl && (
        <Image
          src={postImageUrl}
          placeholder="blur"
          blurDataURL={postImageUrl}
          layout="fill"
          className="rounded-lg post__image"
          alt="post"
        />
      )}
    </div>
    <p className="mt-3 text-sm text-white 2xl:text-base">{postTitle}</p>
  </>
);

export default PostBody;
