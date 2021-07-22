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
