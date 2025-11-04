import Image from "next/image";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandDialog,
} from "@/components/ui/command";

interface Application {
  name: string;
  icon: string;
  url?: string;
  description?: string;
}

const applications: Record<string, Application[]> = {
  Browsers: [
    {
      name: "Firefox",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg",
      url: "https://firefox.com",
    },
    {
      name: "Chrome",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg",
      url: "https://chrome.google.com",
    },
  ],
  "Social Media": [
    {
      name: "X (Twitter)",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png",
      url: "https://x.com",
    },
    {
      name: "Instagram",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
      url: "https://instagram.com",
    },

    {
      name: "LinkedIn",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      url: "https://linkedin.com",
    },
  ],

  Development: [
    {
      name: "GitHub",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg",
      url: "https://github.com",
    },
  ],
  Entertainment: [
    {
      name: "YouTube",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
      url: "https://youtube.com",
    },
    {
      name: "Spotify",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      url: "https://spotify.com",
    },
  ],
};

export default function ApplicationManagerPreview() {
  return (
    <Command className="rounded-lg border shadow-md w-lg mx-auto">
      <CommandInput placeholder="Search applications..." />
      <CommandList>
        <CommandEmpty>No applications found.</CommandEmpty>

        {Object.entries(applications).map(([category, apps], index) => (
          <div key={category}>
            {index > 0 && <CommandSeparator />}
            <CommandGroup heading={category}>
              {apps.map((app) => (
                <CommandItem key={app.name} className="cursor-pointer">
                  <div className="flex items-center gap-3 w-full">
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image
                        src={app.icon}
                        alt={app.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="flex-1">{app.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </Command>
  );
}
