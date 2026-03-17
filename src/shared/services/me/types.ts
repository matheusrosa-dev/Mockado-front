export interface IUseMeService {
  getApiKey: GetApiKey;
}

type GetApiKey = () => Promise<{ apiKey: string }>;
