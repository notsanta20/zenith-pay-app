import { UserProfileForm } from "@/components/custom/UserProfileForm";

function CreateProfile() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex flex-col gap-6 items-center w-full max-w-sm ">
        <div className="flex items-center gap-2 font-medium">
          <img src="./src/assets/icons/infinity.svg" alt="infinity logo" />
          Zenith
        </div>
        <UserProfileForm />
      </div>
    </div>
  );
}

export default CreateProfile;
