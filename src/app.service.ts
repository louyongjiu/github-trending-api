import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load, CheerioAPI, Cheerio } from 'cheerio';
import { RepoDto, BuiltByDto } from './repo.dto';  

@Injectable()
export class AppService {
  getHello(): string {
    return `
      Welcome to the Github Trending API! Available Routes: GET /trending 
    `;
  }
  

  async getTrendingRepos(): Promise<RepoDto[]> {
    try {
      const response = await axios.get('https://github.com/trending?since=daily');
      const $ = load(response.data);
      const repos = $('article.Box-row')
        .map((_, element) => this.extractRepoData($, element))
        .get();
      return repos;
    } catch (error) {
      console.error('Error fetching trending repositories:', error);
      throw new Error('Failed to fetch trending repositories');
    }
  }

  private extractRepoData($: CheerioAPI, element: any): RepoDto {
    const $element = $(element);
    const title = $element.find('h2.h3').text().trim();
    const [author, name] = title.split('/').map((v) => v.trim());
    const relativeUrl = $element.find('h2.h3 a').attr('href');
    const url = `https://github.com${relativeUrl}`;
    const description = $element.find('p.my-1').text().trim();
    const language = $element
      .find('[itemprop=programmingLanguage]')
      .text()
      .trim();
    const languageColor =
      $element.find('.repo-language-color').css('background-color') || null;
    const stars = this.parseNumber(
      $element.find(".mr-3 svg[aria-label='star']").first().parent().text(),
    );
    const forks = this.parseNumber(
      $element.find("svg[aria-label='fork']").first().parent().text(),
    );
    const builtBy = this.extractBuiltBy($, $element);
    const currentPeriodStars = this.parseNumber(
      $element.find('.float-sm-right').text(),
    );

    return {
      author,
      name,
      url,
      description,
      language,
      languageColor,
      stars,
      forks,
      builtBy,
      currentPeriodStars,
    };
  }

  private extractBuiltBy($: CheerioAPI, element: Cheerio<any>): BuiltByDto[] {
    return element
      .find('span:contains("Built by") [data-hovercard-type="user"]')
      .map((_, user) => {
        const altString = $(user).children('img').attr('alt');
        const avatarUrl = $(user).children('img').attr('src');
        return {
          username: altString ? altString.slice(1) : null,
          href: `https://github.com${user.attribs.href}`,
          avatar: this.removeDefaultAvatarSize(avatarUrl),
        };
      })
      .get();
  }

  private parseNumber(text: string): number {
    return parseInt(text.trim().replace(',', '') || '0', 10);
  }

  private removeDefaultAvatarSize(src: string | undefined): string | undefined {
    return src ? src.replace(/\?s=.*$/, '') : src;
  }
}
