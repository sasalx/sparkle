export interface SiteData {
  name: string;
  index: number;
  urlMatcher: RegExp;
  backupUrl(result: unknown): string; // Todo: Dont use unknown
}

const Danbooru: SiteData = {
  name: 'Danbooru',
  index: 9,
  urlMatcher:
    /(?:https?:\/\/)?danbooru\.donmai\.us\/(?:posts|post\/show)\/\d+/i,
  backupUrl: ({ data: { danbooru_id } }) =>
    `https://danbooru.donmai.us/posts/${danbooru_id}`,
};

const sites: { [key: string]: SiteData | undefined } = {
  '9': Danbooru,
};

export default sites;
