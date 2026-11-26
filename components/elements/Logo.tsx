"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import IconButton from "./IconButton";

export default function Logo({
  isInDrawer = false,
  onClickClose = () => {},
}: {
  isInDrawer?: boolean;
  onClickClose?: () => void;
}) {
  const { push } = useRouter();
  return (
    <section className="flex flex-row items-center gap-3">
      {isInDrawer ? (
        <IconButton onClickIcon={onClickClose} icon={<IoCloseOutline size={30} />} />
      ) : (
        <IconButton onClickIcon={() => {}} icon={<RxHamburgerMenu size={24} />} />
      )}
      <div className="cursor-pointer" onClick={() => push("/")}>
        <Image alt="logo" width={100} height={30} src="/main-logo.svg" />
      </div>
    </section>
  );
}
