import dynamic from "next/dynamic";
import "@docsearch/css/dist/sidepanel.css";

const DocSearch = dynamic(
  () => import("@docsearch/core").then((m) => m.DocSearch),
  { ssr: false },
);

const Sidepanel = dynamic(
  () => import("@docsearch/sidepanel").then((m) => m.Sidepanel),
  { ssr: false },
);
const SidepanelButton = dynamic(
  () => import("@docsearch/sidepanel").then((m) => m.SidepanelButton),
  { ssr: false },
);

export default function AlgoliaAskAI( { t, locale, $isLeftMenu } ) {
  return (
    <DocSearch>
      <button
        type="button"
        className={`ask-ai-button ${$isLeftMenu ? "left" : ""}`}
        onClick={() => {
          const btn = document.querySelector(
            ".DocSearch-SidepanelButton.floating",
          );
          btn?.click();
        }}
      >
       {!$isLeftMenu && <span>{t("AskAI")}</span>}
        <div className="ask-ai-button-icon"></div>
      </button>
      <SidepanelButton />
      <Sidepanel
        appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
        getToken={async () => {
          const res = await fetch("/api/ask-ai/token", { method: "POST", body: JSON.stringify({ locale: locale }) });
          const data = await res.json();
          return data.token;
        }}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
        assistantId={process.env.NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID}
        apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY}
        searchParameters={{
          facetFilters: [`locale:${locale}`],
          distinct: false,
        }}
        translations={{
          newConversationScreen: {
            titleText: t("AskAIHeader"),
            introductionText: t("AskAIIntroduction"),
          },
          promptForm: {
            promptDisclaimerText: t("AskAIMistakes"),
            promptPlaceholderText: t("AskAIPlaceholder"),
          },
        }}
      />
    </DocSearch>
  );
}
