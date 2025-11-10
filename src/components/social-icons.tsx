"use client";

import type React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Custom Twitter icon component using the SVG
const TwitterIcon = ({ className }: { className?: string }) => (
  <Image
    src="/Twitter Negative Icon.svg"
    alt="Twitter"
    width={24}
    height={24}
    className={className}
    unoptimized
  />
);

type SocialLink = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    href: "https://x.com/imanmokua",
    icon: TwitterIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mokua-emmanuel-43b798269/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/manue7mokua",
    icon: Github,
  },
  {
    name: "Email",
    href: "mailto:manuelmokuz@gmail.com",
    icon: Mail,
  },
];

export function SocialIcons() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center space-x-4 md:space-x-6">
        {socialLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="p-2 rounded-full hover:bg-accent/10 transition-colors duration-200"
              aria-label={link.name}
            >
              <Icon className="h-5 w-5 md:h-6 md:w-6 text-foreground hover:text-accent transition-colors duration-200" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
