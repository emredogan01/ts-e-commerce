import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function ToastComp({ title }: { title: string }) {
  const { toast } = useToast();

  return (
    <Button variant="outline" onClick={() => {}}>
      {title}
    </Button>
  );
}
