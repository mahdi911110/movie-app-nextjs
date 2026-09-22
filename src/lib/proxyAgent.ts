import { ProxyAgent, setGlobalDispatcher } from "undici";

const proxyAgent = new ProxyAgent('http://192.168.43.1:8080');

setGlobalDispatcher(proxyAgent);