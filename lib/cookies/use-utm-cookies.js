import Cookies from "universal-cookie";
import { useEffect } from "react";

const CONSENT_COOKIE = "cookie_preferences";
const cookies = new Cookies(null, { path: "/" });

const UTM_KEYS = [
  "utm_term",
  "utm_source",
  "utm_campaign",
  "utm_content",
];

export const DEFAULT_CONSENT = {
  necessary: "granted",
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  security_storage: "granted",
  functionality_storage: "denied",
  personalization_storage: "denied",
};

export const ALL_GRANTED = {
  necessary: "granted",
  analytics_storage: "granted",
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  security_storage: "granted",
  functionality_storage: "denied",
  personalization_storage: "denied",
};

const EXPIRES_DAYS = 30;

function setCookie(name, value, days) {
  cookies.set(name, value, {
    path: "/",
    maxAge: days * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });
}

export function setConsentCookie(data) {
  cookies.set(CONSENT_COOKIE, JSON.stringify(data), {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });

  applyConsent(data);
}

export function applyConsent(data) {
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    window.gtag = function (command, action, params) {
      window.dataLayer.push([command, action, params]);
    };
  }

  window.gtag("consent", "update", data);
}

function getCookie(name) {
  return cookies.get(name);
}

export const useUtmCookies = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {};

    UTM_KEYS.forEach((key) => {
      const paramValue = urlParams.get(key);
      const existingCookie = getCookie(key);

      if (paramValue) {
        setCookie(key, paramValue, EXPIRES_DAYS);
        utmData[key] = paramValue;
      } else if (existingCookie) {
        utmData[key] = existingCookie;
      }
    });

    const consentFromCookie = getCookie(CONSENT_COOKIE);
    if (consentFromCookie) {
      try {
        const parsedConsent =
          typeof consentFromCookie === "string"
            ? JSON.parse(decodeURIComponent(consentFromCookie))
            : consentFromCookie;
        applyConsent(parsedConsent);
      } catch (e) {
        console.error("Invalid consent cookie", e);
      }
    }
  }, []);
};