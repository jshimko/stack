import { env } from "next-runtime-env";
import { SmartImage } from "./smart-image";
import logoLightMode from "../../public/logo.svg";
import logoFullLightMode from "../../public/logo-full.svg";
import logoDarkMode from "../../public/logo-bright.svg";
import logoFullDarkMode from "../../public/logo-full-bright.svg";
import { Link } from "./link";

type ImageProps = React.ComponentProps<typeof SmartImage>;


export function Logo(props: (ImageProps | Omit<ImageProps, "src" | "alt">) & { full?: boolean, href?: string}) {
  const { full, ...imageProps } = props;

  const logos = {
    light: props.full ? logoFullLightMode : logoLightMode,
    dark: props.full ? logoFullDarkMode : logoDarkMode,
  };

  const whiteLabelEnabled = env("NEXT_PUBLIC_WHITE_LABEL_ENABLED");

  const whiteLabelLogo = {
    light: props.full ? env("NEXT_PUBLIC_LOGO_FULL_LIGHT") : env("NEXT_PUBLIC_LOGO_LIGHT"),
    dark: props.full ? env("NEXT_PUBLIC_LOGO_FULL_DARK") : env("NEXT_PUBLIC_LOGO_DARK"),
  };

  const logoLight = whiteLabelEnabled ? whiteLabelLogo.light : logos.light;
  const logoDark = whiteLabelEnabled ? whiteLabelLogo.dark : logos.dark;

  const fallBackLogoText = env("NEXT_PUBLIC_LOGO_FALLBACK_TEXT") || "Projects";

  return (
    <>
      <Link href={props.href || "/"} className="block dark:hidden">
        {logoLight ? (
          <SmartImage src={logoLight} alt="Logo" priority {...imageProps} placeholder="empty" />
        ) : (
          <span className="text-lg font-bold">{fallBackLogoText}</span>
        )}
      </Link>
      <Link href={props.href || "/"} className="hidden dark:block">
        {logoDark ? (
          <SmartImage src={logoDark} alt="Logo" priority {...imageProps} placeholder="empty" />
        ) : (
          <span className="text-lg font-bold">{fallBackLogoText}</span>
        )}
      </Link>
    </>
  );
}
