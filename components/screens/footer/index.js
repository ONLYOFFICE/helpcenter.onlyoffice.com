import { useState, useEffect } from "react";
import StyledFooter from "./styled-footer";
import Items from "./data/footer-items";
import FooterItem from "./sub-components/footer-item";
import ExternalLink from "@components/common/external-link";
import InternalLink from "@components/common/internal-link";
import Text from "@components/common/text";

const date = new Date();
const currentYear = date.getFullYear();

const Footer = ({ t, locale }) => {
  const [isClient, setIsClient] = useState(false);
  const onlyoffice = `https://www.onlyoffice.com${locale === "en" ? "" : locale === "pt-BR" ? "/pt" : `/${locale}`}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const isMobile = window.innerWidth <= 1000;

  let columns;
  if (isMobile) {
    columns = [
      [Items[0], Items[1]],
      [Items[2], Items[3]],
      [Items[4]],
    ];
  } else {
    columns = [
      [Items[0]],
      [Items[1], Items[2]],
      [Items[3]],
      [Items[4]],
    ];
  }

  return (
    <StyledFooter>
      <div className="footer">
        {columns.map((columnItems, columnIndex) => (
          <div className="footer-item-group" key={columnIndex}>
            {columnItems.map((item, idx) => (
              <FooterItem
                dis
                heading={t(item.heading)}
                key={`${item.className}-${idx}`}
              >
                {item.link.map((item_link, idx_link) =>
                  item_link.isContact ? (
                    <Text className="contact-text" key={idx_link}>
                      {t(item_link.label)}
                      &nbsp;
                      <InternalLink
                        className="footer-link-contact"
                        label={item_link.mail}
                        href={item_link.href}
                        alt={item_link.mail}
                        key={idx_link}
                      />
                    </Text>
                  ) : (
                    item_link.isInternal ? (
                      <InternalLink
                        className="footer-link"
                        label={t(item_link.label)}
                        href={
                          item_link.localize
                            ? onlyoffice + item_link.href
                            : item_link.href
                        }
                        key={`${item_link.label}-${idx_link}`}
                      />
                    ) : (
                      <ExternalLink
                        className="footer-link"
                        label={t(item_link.label)}
                        href={
                          item_link.localize
                            ? onlyoffice + item_link.href
                            : item_link.href
                        }
                        key={`${item_link.label}-${idx_link}`}
                      />
                    )
                  )
                )}
              </FooterItem>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-copyright-block">
        <ExternalLink href={onlyoffice} label="onlyoffice.com" />
        <Text className="footer-copyright" label={t("FooterCopyright", { currentYear })} />
      </div>
    </StyledFooter>
  );
};

export default Footer;