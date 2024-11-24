
import { h } from "preact";
import './style/index.css';
import App from './components/app';
import { hydrate, prerender as ssr } from 'preact-iso';

if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app') as HTMLElement);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function prerender(data: any) {
    return await ssr(<App {...data} />);
}
