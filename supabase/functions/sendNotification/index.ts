import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Vérifier l'en-tête d'autorisation
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  const APIKEY = Deno.env.get('apiKey');

  // Comparer avec ton vrai jeton
  if (!token || token !== APIKEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Récupérer le titre et le message du corps de la requête
  const { title, message } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: 'Invalid request payload' });
  }

  // Logique pour envoyer la notification (ajoute ici l'intégration à ton service de notification)

  return res.status(200).json({ success: true });
}
