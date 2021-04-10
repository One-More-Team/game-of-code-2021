import { createAction } from "./action-creator";

export const changeSiteLanguage = createAction({
  type: "CHANGE_SITE_LANGUAGE",
});

export const saveSiteTranslationData = createAction({
  type: "SAVE_SITE_TRANSLATION_DATA",
});
