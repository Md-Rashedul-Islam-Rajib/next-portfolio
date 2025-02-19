import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Icon } from "@iconify/react";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: "solar:home-outline",
  },
  {
    name: "Blogs",
    link: "/blogs",
    icon: "line-md:rss",
  },
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: "material-symbols:dashboard",
  },
  {
    name: "Contact",
    link: "/contact",
    icon: "mdi:contact-mail",
  },
];

const NavMenu = () => {
  const navStyle =
    "hover:bg-white hover:text-zinc-700 hover:rounded-xl hover:py-1 hover:px-2 flex items-center space-x-2";

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList className="space-x-6 text-white font-semibold">
          {navItems.map((item) => (
            <Link key={item.link} href={item.link}>
              <NavigationMenuItem className={navStyle}>
                <Icon
                  icon={item.icon}
                  width={24}
                  height={24}
                  className="h-4 w-4 text-neutral-500 dark:text-white"
                />
                <span>{item.name}</span>
              </NavigationMenuItem>
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
