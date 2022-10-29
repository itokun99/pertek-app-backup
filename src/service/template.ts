import { ApiProxyEndpoint } from "@config/apiProxyEndpoint";

export async function getTemplateTenant(): Promise<void> {
  const url = `${ApiProxyEndpoint.Template}?model=tenant`;
  const res = await fetch(url);

  if(!res.ok) {
    const p = await res.json();
    throw Promise.reject({ message: p?.message || 'Terjadi Kesalahan' })
  }

  if(window && window.location) {
    location.replace(url);
  }
  return;
}