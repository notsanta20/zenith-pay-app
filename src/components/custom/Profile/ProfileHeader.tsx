import { Button } from "@/components/ui/button";
import { Calendar, Phone, Verified } from "lucide-react";

export default function ProfileHeader() {
  return (
    <section className="bg-card border border-input rounded-md p-5 flex flex-col md:flex-row gap-8 w-full md:min-w-[400px] md:max-w-[700px] md:mx-auto">
      <div className="self-center">PROFILE</div>
      <div className="self-center flex flex-col items-center md:items-start gap-4">
        <span className="font-bold text-lg">Santa</span>
        <div className="flex gap-4 text-(--text-gray) text-sm">
          <div className="flex max-[440px]:flex-col max-[440px]:text-center items-center gap-2">
            <Phone size={15} />
            <span>123451235</span>
          </div>
          <div className="flex max-[440px]:flex-col max-[440px]:text-center items-center gap-2">
            <Calendar size={15} />
            <span>Joined March 12</span>
          </div>
          <div className="flex max-[440px]:flex-col max-[440px]:text-center items-center gap-2">
            <Verified size={15} />
            <span>kyc verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
