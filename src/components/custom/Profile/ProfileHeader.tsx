import { Calendar, Phone, Verified } from "lucide-react";
import UserProfilePic from "./UserProfilePic";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/apis/getRequests";
import type { userProfile } from "@/types/types";

export default function ProfileHeader() {
  const getProfile = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  if (getProfile.isSuccess) {
    const userData: userProfile = getProfile.data?.data;

    return (
      <section className="bg-card border border-input rounded-md p-5 flex flex-col gap-4 md:flex-row md:gap-8 w-full">
        <div className="self-center">
          <UserProfilePic name={userData.full_name} />
        </div>
        <div className="self-center flex flex-col items-center md:items-start gap-4">
          <span className="font-bold text-lg">{userData.full_name}</span>
          <div className="flex gap-4 text-(--text-gray) text-sm">
            <div className="flex max-[440px]:flex-col max-[440px]:text-center items-center gap-2">
              <Phone size={15} />
              <span>{userData.phone}</span>
            </div>
            <div className="flex max-[440px]:flex-col max-[440px]:text-center items-center gap-2">
              <Calendar size={15} />
              <span>{userData.dob}</span>
            </div>
            <div
              className={
                "flex max-[440px]:flex-col max-[440px]:text-center items-center gap-2 " +
                (!userData.kyc_status && "text-[#e7000b]")
              }
            >
              {<Verified size={15} />}
              <span>
                {userData.kyc_status ? "kyc verified" : "kyc not verified"}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
