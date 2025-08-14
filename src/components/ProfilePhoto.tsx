import React from "react";

interface ProfilePhotoProps {
  src: string;
  alt?: string;
  className?: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt || "Profile"}
    className={`w-40 h-40 object-contain rounded-full mr-8 drop-shadow-lg ${className || ""}`.trim()}
    style={{ minWidth: 160, minHeight: 160 }}
    tabIndex={0}
  />
);

export default ProfilePhoto;
