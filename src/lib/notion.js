import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const databaseId = process.env.NOTION_DB_ID;

export const getHonorees = async (cursor) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return {
    data: response.results,
  };
};


export const getHonoreeById = async (pageId) => {
  const post = await notion.pages.retrieve({ page_id: pageId });
  const blocks = await notion.blocks.children.list({ block_id: pageId });

  return { pageInfo: post, blocks: blocks.results };
};

export const getHonoreesBySlug = async (slug) => {
  const honoree = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'slug',
          text: {
            equals: slug,
          },
        },
      ],
    },
  });

  return { data: honoree };
};

export const getHonoreesByYear = async (year) => {
  const honorees = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Year',
          select: {
            equals: year,
          },
        },
      ],
    },
  });

  return { data: honorees.results };
};

export const getHonoreesBySport = async (sport) => {
  const honorees = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Sport',
          select: {
            equals: sport,
          },
        },
      ],
    },
  });

  return { data: honorees.results };
};


export const getPostById = async (postId) => {
  const post = await notion.pages.retrieve({ page_id: postId });
  const blocks = await notion.blocks.children.list({ block_id: postId });
  return { pageInfo: post, blocks: blocks.results };
};
