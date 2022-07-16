import { NPPCSettings } from "../settings";
export default function serverFetch(command: string) {
  return fetch(NPPCSettings.server.url+command, {
    headers: {
      'Authorization': 'NPPC_AUTH key=1,value=2',
      'NPPC_AUTH': NPPCSettings.user,
    }
  });
}
  