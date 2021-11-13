import {
  DashBoardIcon,
  GroupIcon,
  MagicIcon,
  AccountIcon,
  NotificationIcon,
  CategoryIcon,
  AdminsIcon
} from "../../../public/icons/icons";

export default [
  {
    label: "Dashboard",
    link: "app/dashboard",
    icon: <DashBoardIcon fill="#000" />,
    activeIcon: <DashBoardIcon fill="#FFF" />,
    id: "dashboard"
  },
  {
    label: "Users",
    link: "app/users",
    icon: <GroupIcon fill="#000" />,
    activeIcon: <GroupIcon fill="#FFF" />,
    id: "users"
  },

  {
    label: "Administrators",
    link: "app/admin",
    icon: <AdminsIcon fill= "#000"/>,
    activeIcon: <AdminsIcon fill="#FFFF" />,
    id: "admin"
  },

  {
    label: "Categories",
    link: "app/categories",
    icon: <CategoryIcon fill="#000" />,
    activeIcon: <CategoryIcon fill="#FFF" />,
    id: "categories"
  },

  {
    label: "Notifications",
    link: "app/notifications",
    icon: <NotificationIcon fill="#000" />,
    activeIcon: <NotificationIcon fill="#FFF" />,
    id: "notifications"
  },

  {
    label: "My Account",
    link: "app/myaccount",
    icon: <AccountIcon fill="#000" />,
    activeIcon: <AccountIcon fill="#FFF" />,
    id: "myaccount"
  }
];
