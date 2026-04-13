import StyledHeader from "./styled-header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LanguageSelector from "@components/common/language-selector";
import InternalLink from "@components/common/internal-link";
import DropdownMenu from "./sub-components/dropdown-menu";

const Header = ({ t, locale, data, isMain, leftMenuIsOpen, setLeftMenuIsOpen }) => {
  const menu = t("Menu");
  const [menuName, setMenuName] = useState(menu);
  const [menuMobile, setMenuMobile] = useState(false);
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const currentCategory = data?.data?.find((item) => item.url === `/${router.query.category}`);

    if (currentCategory) {
      setMenuName(currentCategory.name);
    } else {
      setMenuName(menu);
    }
    setMenuMobile(false);
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav, .left-menu, .header-mobile-toggle-btn, .header-mobile-menu-btn")) {
        setMenuMobile(false);
        setLeftMenuIsOpen(false);
      }
    };

    if (menuMobile || leftMenuIsOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuMobile, leftMenuIsOpen]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setLeftMenuIsOpen(false);
        };
      }

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <StyledHeader $locale={locale}>
      <div className="header-container">
        <button
          onClick={() => {
            setLeftMenuIsOpen(true)
            setMenuMobile(false)
          }}
          className={`header-mobile-toggle-btn ${isMain ? "is-main" : ""}`}
        >
        </button>
        <InternalLink className="logo" href="/" />
        <button
          onClick={() => setMenuMobile(!menuMobile)}
          className={`header-mobile-menu-btn ${menuMobile ? "open" : ""} ${menuName === menu ? "" : "active"}`}
        >
          {menuName}
        </button>
        <nav className={`nav ${menuMobile ? "open" : ""}`}>
          <ul className="nav-list">
            {data?.data
              ?.sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity))
              .map((item, index) => (
                <li className="nav-item" key={index} onMouseEnter={() => setOpenIndex(index)}
                  onMouseLeave={() => setOpenIndex(null)}>
                  {menuMobile ? (
                    <InternalLink
                      className={`nav-link ${`/${router.query.page}` === item.url ? "active" : ""}`}
                      href={item.url}
                      label={item.name}
                    />
                  ) : (
                    <div className={`nav-link ${`/${router.query.page}` === item.url ? "active" : ""}`}>
                      {item.name}
                    </div>
                  )}
                  {!menuMobile && openIndex === index && <DropdownMenu item={item} />}
                </li>
              ))}
          </ul>
        </nav>
        <LanguageSelector locale={locale} />
      </div>
    </StyledHeader>
  );
};

export default Header;