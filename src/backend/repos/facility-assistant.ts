export async function getAssistant(req: NextApiRequest) {
  const { id } = req.query;
  const response = await fetch(`${process.env.API_URL}/assistants/${id}`);
  const payload = await response.json();
  return [response, payload];
}
