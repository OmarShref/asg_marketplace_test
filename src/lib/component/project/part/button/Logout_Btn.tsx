"use client";
import { LogoutIcon } from "@/lib/assets/svg";
import { Texts, getText } from "@/lib/assets/text";
import { Button } from "@/lib/component/generic/ui/button";
import { GtmEvents } from "@/lib/core/analytics/Gtm";
import useUserStore from "@/lib/data/stores/UserStore";
import { cn } from "@/lib/utils/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  storeCode: string;
}

export default function Logout_Btn({ className, storeCode, ...props }: Props) {
  function handleLogOut() {
    useUserStore.setState({
      customer: null,
      cart: null,
      wishList: null,
      lastOrder: null,
      anonymousId: null,
    });

    new GtmEvents({}).logout();

    location.reload();
  }

  return (
    <Button
      className={cn(" gap-1", className)}
      onClick={handleLogOut}
      {...props}
    >
      <LogoutIcon />
      <p className=" text-accent">
        {getText({ storeCode: storeCode, text: Texts.logout })}
      </p>
    </Button>
  );
}
