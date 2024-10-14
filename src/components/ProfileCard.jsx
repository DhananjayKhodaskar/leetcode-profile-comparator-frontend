import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/Input";
import AuthHeader from "./AuthHeader";
import { Label } from "@radix-ui/react-dropdown-menu";

const ProfileCard = ({ data }) => {
  const {
    username,
    realName,
    userAvatar,
    birthday,
    countryName,
    company,
    school,
    aboutMe,
  } = data;

  const avatarFallbackText = username ? username.charAt(0).toUpperCase() : "-";

  return (
    <div className="flex flex-col gap-3">
      <AuthHeader
        title="Confirm Your Leetcode Profile"
        subtitle="Not your profile? "
        linkText="Go back"
      />
      <div className="flex items-center space-x-4 mb-4">
        <Avatar>
          <AvatarImage src={userAvatar} alt={username} size="5" />
          <AvatarFallback>{avatarFallbackText}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="realName">Name</Label>
          <Input
            type="text"
            value={realName || "-"}
            disabled
            className="border-none bg-gray-100 p-2 rounded-md w-full"
            id="realName"
          />
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            value={`@${username || "-"}`}
            disabled
            className="border-none bg-gray-100 p-2 rounded-md w-full"
            id="username"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="aboutMe">About Me</Label>
        <Input
          type="text"
          value={aboutMe || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="aboutMe"
          placeholder="About Me"
        />

        <Label htmlFor="country">Location</Label>
        <Input
          type="text"
          value={countryName || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="country"
          placeholder="Location"
        />

        <Label htmlFor="birthday">Birthday</Label>
        <Input
          type="text"
          value={birthday || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="birthday"
          placeholder="Birthday"
        />

        <Label htmlFor="school">Education</Label>
        <Input
          type="text"
          value={school || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="school"
          placeholder="Education"
        />

        <Label htmlFor="company">Company</Label>
        <Input
          type="text"
          value={company || "-"}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="company"
          placeholder="Company"
        />

        {/* <Label htmlFor="totalSubmissions">Total Submissions</Label>
        <Input
          type="text"
          value={`Total Submissions: ${totalSubmissions || "-"}`}
          disabled
          className="border-none bg-gray-100 p-2 rounded-md w-full"
          id="totalSubmissions"
        /> */}
      </div>
    </div>
  );
};

export default ProfileCard;
