import Spacing from "@/lib/component/generic/pure/spacing";
import {
  Card,
  CardContent,
  CardSection,
} from "@/lib/component/generic/ui/card";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  cardTitle?: string;
}

export default function OrderDetails_Card({ cardTitle, children = "" }: Props) {
  return (
    <Card className=" rounded-xl bg-background px-5 py-3 shadow">
      <CardContent>
        <CardSection>
          <p className=" text-lg font-medium">{cardTitle}</p>
        </CardSection>
        <Spacing value={4} />
        {children}
        <Spacing value={2} />
      </CardContent>
    </Card>
  );
}
