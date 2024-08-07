"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/lib/component/generic/ui/form";
import { Input } from "@/lib/component/generic/ui/input";
import { Texts, getText } from "@/lib/assets/text";
import InlineApply_Btn from "../../part/button/InlineApply_Btn";
import Spacing from "@/lib/component/generic/pure/spacing";
import {
  applyCouponToCart,
  applyRewardPointsToCart,
} from "@/lib/network/client/gql/cart";
import useUserStore from "@/lib/data/stores/UserStore";
import { useToast } from "@/lib/component/generic/ui/use-toast";
import validator from "validator";

type Props = {
  storeCode: string;
  setOpenRewardPointsDrawer: (open: boolean) => void;
};

export function RewardPoints_Form({
  storeCode,
  setOpenRewardPointsDrawer,
}: Props) {
  const { toast } = useToast();

  const formSchema = z.object({
    points: z
      .string()
      .trim()
      .refine(validator.isNumeric, {
        message: getText({
          storeCode: storeCode,
          text: Texts.pointsAreNotValid,
        }),
      }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      points: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpenRewardPointsDrawer(false);
    const applyRewardPointsToCartData = await applyRewardPointsToCart({
      points: Number(values?.points),
    });

    if (applyRewardPointsToCartData?.success) {
      useUserStore.setState({
        cart: applyRewardPointsToCartData?.cart,
        checkoutRewardPoints: applyRewardPointsToCartData?.checkoutRewardPoints,
      });
    } else {
      toast({
        description: applyRewardPointsToCartData?.errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-80 ">
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem className=" flex-1">
              <FormControl>
                <div className="flex items-stretch justify-center">
                  <Input
                    type="text"
                    placeholder={getText({
                      storeCode: storeCode,
                      text: Texts.enterTheCouponCode,
                    })}
                    className=" rounded-e-none"
                    {...field}
                  />
                  <InlineApply_Btn
                    storeCode={storeCode}
                    className=" rounded-s-none"
                  />
                </div>
              </FormControl>
              <Spacing value={1} />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
