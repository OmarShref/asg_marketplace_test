import {
  FacebookIcon,
  GrayPaymentMethodsIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/lib/assets/svg";
// import Anchor from "@/lib/component/generic/pure/anchor";

type Props = {};

export const Social_Payment_Bar = (props: Props) => {
  const socialIcons = [
    {
      icon: <InstagramIcon />,
      url: "",
    },
    {
      icon: <TwitterIcon />,
      url: "",
    },
    {
      icon: <FacebookIcon />,
      url: "",
    },
  ];
  return (
    <div className=" flex items-center justify-center border-t-2 border-t-inactive_bullet bg-socialBar_background px-5 py-4 ">
      {/* <div className=" flex items-center justify-center gap-4">
        {socialIcons.map((socialIcon, index) => {
          return (
            <Anchor key={index} href={socialIcon?.url}>
              {socialIcon.icon}
            </Anchor>
          );
        })}
      </div> */}
      <GrayPaymentMethodsIcon />
    </div>
  );
};
