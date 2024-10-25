export class BuiltByDto {
  username: string | null;
  href: string;
  avatar: string;
}

export class RepoDto {
  author: string;
  name: string;
  url: string;
  description: string;
  language: string;
  languageColor: string | null;
  stars: number;
  forks: number;
  builtBy: BuiltByDto[];
  currentPeriodStars: number;
}
