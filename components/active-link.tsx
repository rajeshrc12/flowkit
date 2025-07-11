import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  icon: ReactNode;
  name: string;
}

export default function ActiveLink({ href, icon, name }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} passHref>
      <Button
        className={`w-full px-2 py-3 rounded-md transition-all flex justify-start gap-4 ${
          isActive
            ? "bg-gray-100 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        variant="ghost"
      >
        <span>{icon}</span>
        <span>{name}</span>
      </Button>
    </Link>
  );
}
