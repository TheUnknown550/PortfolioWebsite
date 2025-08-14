import React from "react";

interface ProfilePhotoProps {
  src: string;
  alt?: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt || "Profile"}
    className="w-40 h-40 object-contain rounded-full mr-8 drop-shadow-lg"
    style={{ minWidth: 160, minHeight: 160 }}
  />
);

export default ProfilePhoto;
