import { cn } from "@/lib/utils/utils";
import NoData from "../../../../public/no-data.png";
import Image from "next/image";

type NoItemsProps = {
  label: string;
  classNames?: {
    wrapper?: string;
    icon?: string;
    label?: string;
  };
};

function NoItems({
  label,
  classNames = { wrapper: "", icon: "", label: "" },
}: NoItemsProps) {
  return (
    <div
      className={`mx-auto my-auto flex text-grey items-center justify-center flex-col gap-3 ${classNames.wrapper}`}
    >
      <Image
        src={NoData}
        alt="No Data"
        className={`w-32 h-32 ${classNames.icon}`}
      />
      <p
        className={cn(
          "text-lg font-normal text-center",
          classNames.label,
        )}
      >
        {label}
      </p>
    </div>
  );
}

export default NoItems;
