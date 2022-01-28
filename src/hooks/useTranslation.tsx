import { useRouter } from "next/router";

type DefaultLanguageResource = typeof en;
type LanguageKey = keyof typeof en;

const en = {
  home: "Home",
  projects: "Projects",
  about: "About Us",
  contribute: "Contribute",
  contact: "Contact",
  yahpa: "YAHPA",
  yahpa_full: "Young Asian Health Professional Association",
  organization: "Organization",
  languages: "Languages",
  support: "Support",
  coming_soon: "Coming Soon",
  error_404_title: "Page Not Found",
  error_404_message: "The page you're looking for does not seem to exist",
  error_404_button: "Return to Home",
  learn_more: "Learn More",
  see_event: "See Event",
  become_member: "Become a Member",
  latest_activity: "Our Latest Activity",
  register_title: "Interested in becoming a member?",
  register_video_title: "Montreal YAHPA registery",
  register_cta: "I want to register as a member",
  register_modal: "Please choose the option that applies to you",
  follow_social: "Follow us on our Social Media",
  show_more: "Show more",
  show_less: "Show less",
};

const fr: DefaultLanguageResource = {
  home: "Accueil",
  projects: "Projets",
  about: "À propos de nous",
  contribute: "Contribuer",
  contact: "Nous contacter",
  yahpa: "AJPAS",
  yahpa_full: "Association des Jeunes Professionnels Asiatique de la Santé",
  organization: "Notre Organisation",
  languages: "Langages",
  support: "Support",
  coming_soon: "Bientôt disponible",
  error_404_title: "Page non trouvée",
  error_404_message: "La page que vous recherchez ne semble pas exister",
  error_404_button: "Retourner à l'accueil",
  learn_more: "En savoir plus",
  see_event: "Voir plus",
  become_member: "Comment devenir membre",
  latest_activity: "Notre dernière activité",
  register_title: "Intéressé à devenir membre?",
  register_cta: "Je veux m'inscrire en tant que membre",
  register_modal: "Veuillez choisir l'option qui s'applique à vous",
  register_video_title:
    "Registre des professionnels asiatiques de la santé de Montréal - YAHPA",
  follow_social: "Suivez-nous sur nos réseaux sociaux",
  show_more: "voir plus",
  show_less: "voir moin",
};

const zh: DefaultLanguageResource = {
  home: "主页",
  projects: "项目",
  about: "关于我们",
  contribute: "贡献",
  contact: "联系我们",
  yahpa: "YAHPA",
  yahpa_full: "亚洲青年健康专业协会",
  organization: "组织",
  languages: "语言",
  support: "支持",
  coming_soon: "即将推出",
  error_404_title: "找不到网页",
  error_404_message: "您要找的页面似乎不存在",
  error_404_button: "返回主页",
  learn_more: "学到更多",
  see_event: "看活动",
  become_member: "成为会员",
  latest_activity: "我们的最新活动",
  register_title: "有兴趣成为会员？",
  register_cta: "我想注册成为会员",
  register_modal: "请选择适用于您的选项",
  register_video_title: "蒙特利尔 YAHPA 登记处",
  follow_social: "在社交媒体上关注我们",
  show_more: "显示更多",
  show_less: "显示较少",
};

const resources = {
  en,
  fr,
  zh,
} as const;

export type Resource = keyof typeof resources;

type TranslatedLanguageName = {
  [language in Resource]: string;
};

export default function useTranslation() {
  const router = useRouter();
  const { locales, locale, pathname, asPath, query } = router;

  const languages: TranslatedLanguageName = {
    en: "English",
    fr: "Français",
    zh: "简体中文",
  };

  function t(key: LanguageKey) {
    return resources[locale as Resource][key];
  }

  function updateLocale(locale: string | Resource) {
    router.push({ pathname, query }, asPath, { locale });
  }

  return { t, locales, locale, languages, updateLocale };
}
