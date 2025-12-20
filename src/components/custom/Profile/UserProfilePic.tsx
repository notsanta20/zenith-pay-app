export default function UserProfilePic({ name }: { name: string }) {
  return (
    <div className="w-20 h-20 rounded-full bg-input text-foreground text-4xl font-bold flex justify-center items-center">
      {name[0].toUpperCase()}
    </div>
  );
}
