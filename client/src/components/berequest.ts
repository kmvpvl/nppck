import { NPPCSettings } from "../settings";
export default async function serverFetch(command: string) {
    try{
        
      const response = await fetch(NPPCSettings.server.url+command);
      const json = await response.json();
      console.log(json);
      return json;
    }
    catch(err) {
      throw err;
      console.log(err);
    }
  }
  