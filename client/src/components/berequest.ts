import { NPPCSettings } from "../settings";
export default function serverFetch(command: string) {
  return fetch(NPPCSettings.server.url+command);
}
  