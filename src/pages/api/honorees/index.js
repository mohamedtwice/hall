import { getHonorees } from '@/lib/notion';

export default async function handler(req, res) {
  const { cursor } = req.query;
  const honorees = await getHonorees(cursor);

  res.status(200).json(honorees);
}
