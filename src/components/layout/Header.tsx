import { Icon } from "@iconify/react/dist/iconify.js";
import { TextInput } from "@mantine/core";
import ProfilePicture from "../ui/ProfilePicture";
import iconUser from "@/styles/assets/icon-user.jpg";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-300">
      <div className="flex items-center justify-between p-3">
        <div className="w-full">
          <TextInput
            leftSection={
              <Icon
                icon="material-symbols:search-rounded"
                width="18"
                height="18"
              />
            }
            placeholder="Cari disini"
          />
        </div>
        <ProfilePicture alt="User Profile" imageUrl={iconUser.src} />
      </div>
    </header>
  );
}
