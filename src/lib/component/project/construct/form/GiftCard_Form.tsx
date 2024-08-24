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
import { addGiftCardToCart } from "@/lib/network/client/gql/cart";
import useUserStore from "@/lib/data/stores/UserStore";
import { useToast } from "@/lib/component/generic/ui/use-toast";

type Props = {
  storeCode: string;
  setGiftCardDrawerOpen: (open: boolean) => void;
};

export function GiftCard_Form({ storeCode, setGiftCardDrawerOpen }: Props) {
  const { toast } = useToast();

  const formSchema = z.object({
    giftCardCode: z.string().min(1, {
      message: getText({
        storeCode: storeCode,
        text: Texts.giftCardCodeIsRequired,
      }),
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      giftCardCode: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setGiftCardDrawerOpen(false);
    const addGiftCardTocartData = await addGiftCardToCart({
      code: values?.giftCardCode,
    });
    if (addGiftCardTocartData?.success) {
      useUserStore.setState({ cart: addGiftCardTocartData?.cart });
    } else {
      toast({
        description: getText({
          storeCode: storeCode,
          text: Texts?.cardCodeIsNotValid,
        }),
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-80 ">
        <FormField
          control={form.control}
          name="giftCardCode"
          render={({ field }) => (
            <FormItem className=" flex-1">
              <FormControl>
                <div className="flex items-stretch justify-center">
                  <Input
                    type="text"
                    placeholder={getText({
                      storeCode: storeCode,
                      text: Texts.enterCardCode,
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
