import CONFIG from "@config/config";

const translateText = async (id, collectionType, targetLanguage, isUpdate) => {
  const CMSConfigAPI = CONFIG.api.cms || "http://localhost:1337";
    try {
      const response = await fetch(`${CMSConfigAPI}/api/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, collectionType, targetLanguage, isUpdate }),
      });
      if (!response.ok) {
        throw new Error('Error while fetching translation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  export default translateText;
  