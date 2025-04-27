
import { useContext } from "react";
import { useRegion } from "@/context/RegionContext";
import { getTranslation } from "@/i18n/translations";

export const useTranslation = () => {
  const { language } = useRegion();
  
  const t = (key: string): string => {
    return getTranslation(language, key as any, key);
  };
  
  return { t, locale: language };
};
