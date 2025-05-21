import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AppstoreOutlined,
  AuditOutlined,
  ContainerOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Modal, Select } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { setLanguage } from "@/helpers/Storage";
import { removeToken } from "@/helpers/Tokens";
import { admin_token } from "@/helpers/LS_KEYS";
import { apiAdmin } from "@/hooks/api_admin";
import IconRU from "@/assets/icons/IconRu";
import IconUz from "@/assets/icons/IconUz";
import { DataContext } from "@/context/DataContext";
import { MenuItem } from "@/types/globalInterfaces";
import { SIDER_OPEN_KEYS } from "@/constants/consts";
const { Header, Sider, Content, Footer } = Layout;

interface AntdMenuItem {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: AntdMenuItem[];
}

export default function AppLayout() {
  const { adminData } = useContext(DataContext);
  const [collapsed, setCollapsed] = useState(false);
  const [isLogoutProcessing, setLogoutProcessing] = useState(false);
  const [isProfileDropdownShow, setProfileDropdownShow] = useState(false);

  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    const savedOpenKeysString = sessionStorage.getItem(SIDER_OPEN_KEYS);
    try {
      return savedOpenKeysString ? JSON.parse(savedOpenKeysString) : [];
    } catch (e) {
      console.error("Failed to parse SIDER_OPEN_KEYS from sessionStorage", e);
      sessionStorage.removeItem(SIDER_OPEN_KEYS);
      return [];
    }
  });
  
  const { generateToken } = useContext(DataContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        key: "/",
        icon: <HomeOutlined />,
        label: t("sidebar.home"),
        show: true,
      },
      {
        key: "/customers",
        icon: <AppstoreOutlined />,
        label: t("sidebar.application"),
        show: true,
      },
      {
        key: "/dresses",
        icon: <ContainerOutlined />,
        label: t("sidebar.contract"),
        show: true,
      },
      {
        key: "/consultants",
        icon: <AuditOutlined />,
        label: t("sidebar.guarant"),
        show: true,
      },
      {
        key: "/sections",
        icon: <UsergroupAddOutlined />,
        label: t("sidebar.users"),
        show: true,
      },
    ],[t]);
  

  const transformMenuItems = useCallback(
    (items: MenuItem[]): AntdMenuItem[] => {
      return items
        .filter(
          (item): item is MenuItem & { show: true } => item && !!item.show
        )
        .map((item): AntdMenuItem => {
          const { key, icon, label, children } = item;
          const baseItem: AntdMenuItem = { key, icon, label };

          if (children && Array.isArray(children) && children.length > 0) {
            const visibleChildren = transformMenuItems(children);
            if (visibleChildren.length > 0) {
              baseItem.children = visibleChildren;
            }
          }
          return baseItem;
        });
    },
    []
  );

  const antdMenuItems = useMemo(
    () => transformMenuItems(menuItems),
    [menuItems, transformMenuItems]
  );

  useEffect(() => {
    let parentKey: string | undefined = undefined;
    for (const item of menuItems) {
      if (
        item?.show &&
        item.children?.some(
          (child) => child?.show && child.key === location.pathname
        )
      ) {
        parentKey = item.key;
        break;
      }
    }

    if (parentKey) {
      setOpenKeys((currentKeys) => {
        if (!currentKeys.includes(parentKey!)) {
          const newOpenKeys = [...currentKeys, parentKey!];
          sessionStorage.setItem(SIDER_OPEN_KEYS, JSON.stringify(newOpenKeys));
          return newOpenKeys;
        }
        return currentKeys;
      });
    }
  }, [location.pathname, menuItems]);

  const handleMenuClick = useCallback(
    (e: { key: string }) => {
      navigate(e.key);
    },
    [navigate]
  );

  const handleOpenChange = useCallback(
    (keys: string[]) => {
      setOpenKeys(keys);
      sessionStorage.setItem(SIDER_OPEN_KEYS, JSON.stringify(keys));
    },
    [setOpenKeys]
  );

  useEffect(() => {
    const handleClickOutside = () => {
      if (isProfileDropdownShow) {
        setProfileDropdownShow(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileDropdownShow]);

  const handleLogout = useCallback(() => {
    Modal.confirm({
      title: t("Xaqiqatdan sahifan chiqmoqchimisiz?"),
      content: "Agar sahifani tark etmoqchi bo'lsangiz, Tasdiqlang.",
      okText: "Ha",
      cancelText: "Yo'q",
      okType: "danger",
      onOk: async () => {
        setLogoutProcessing(true);
        try {
          await apiAdmin("POST", "auth/sign-out");
        } catch (error) {
          console.error("Logout API call failed:", error);
        } finally {
          removeToken(admin_token);
          generateToken(null);
          sessionStorage.removeItem(SIDER_OPEN_KEYS);
          setLogoutProcessing(false);
          navigate("/admin-login", { replace: true });
        }
      },
    });
  }, [t, navigate, generateToken]);

  useEffect(() => {
    const shouldCollapse = location.pathname.startsWith("/admin/");
    if (shouldCollapse) {
      setCollapsed(true);
    }
  }, [location.pathname]);

  const handleLanguageChange = useCallback((value: string) => {
    i18next.changeLanguage(value);
    setLanguage(value);
  }, []);

  return (
    <Layout className="h-screen flex">

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen overflow-y-auto !bg-white"
        width={300}
      >
        <div className="text-center my-2 flex justify-center text-white items-center gap-1 bg-[#824fe3] mx-2 rounded-md py-1.5 sticky top-0 z-10">
          💄 {!collapsed && <span className="text-lg duration-150">Miss Gulandon</span>}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          items={antdMenuItems}
          className="!text-[16px]"
        />
      </Sider>

      <Layout className="flex flex-col flex-1">
        <Header className="sticky !px-4 top-0 z-10 !bg-white shadow-md flex items-center ">
          <div className="flex items-center justify-between w-full relative">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-[22px]"
            />
            <div className="flex gap-3 items-center">
              <Select
                defaultValue={i18next.language}
                className="w-[75px]"
                onChange={handleLanguageChange}
                options={[
                  {
                    value: "uz",
                    label: (
                      <span className="flex items-center gap-1.5">
                        <IconUz className={"size-5"} /> <span> uz </span>
                      </span>
                    ),
                  },
                  {
                    value: "ru",
                    label: (
                      <span className="flex items-center gap-1.5">
                        <IconRU className={"size-5"} /> <span> ru </span>
                      </span>
                    ),
                  },
                ]}
              />
              <p className="text-lg hidden sm:block">{adminData?.name}</p>
              <Button
                className="!w-10 !h-10 !p-0 !rounded-full"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.stopPropagation();
                  setProfileDropdownShow((prev) => !prev);
                }}
              >
                <Avatar className="w-full h-full m-0" icon={<UserOutlined />} />
              </Button>
            </div>
          </div>
          
          <div
            className={`absolute rounded-lg border border-zinc-50 shadow-md flex flex-col p-3 justify-center items-start bg-white z-20 origin-top-right duration-150 top-[60px] right-4 w-auto min-w-[180px] ${
              isProfileDropdownShow
                ? "scale-100 opacity-100 visible"
                : "scale-95 opacity-0 invisible"
            }`}
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
          >
            <Button
              className="w-full py-3 rounded-md mt-2"
              onClick={handleLogout}
              type="primary"
              danger
              loading={isLogoutProcessing}
              icon={<UserSwitchOutlined />}
            >
              Logout
            </Button>
          </div>

        </Header>
        <Content className="m-2 rounded-md flex-1 overflow-auto panel">
          <Outlet />
        </Content>
        <Footer className="text-center !py-3 panel m-2 mt-0 rounded-md">
          Farrux Komilovich ©{new Date().getFullYear()}
        </Footer>
      </Layout>
      
    </Layout>
  );
}
