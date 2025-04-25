
import { useRegion } from "@/context/RegionContext";
import { getTranslation } from "@/i18n/translations";

export const useTranslation = () => {
  const { language } = useRegion();
  
  const t = (key: string, fallback?: string): string => {
    return getTranslation(language, key as any, fallback);
  };
  
  return { t };
};
