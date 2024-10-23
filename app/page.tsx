import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Dedi Setiawan</h2>
      <Button>Subscribe</Button>
      <UserButton />
    </div>
  );
}
