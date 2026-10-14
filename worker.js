// Canônico é a raiz: www.xikseguros.com.br responde 301 para xikseguros.com.br, mantendo caminho e query.
export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.xikseguros.com.br') {
      url.hostname = 'xikseguros.com.br';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
