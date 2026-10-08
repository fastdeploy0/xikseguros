# Direções para os dois heroes

Propostas para discussão, sem implementação. A etapa 2 só entra no código depois que Thiago trouxer o design do Claude Design. Publicação depende de sua validação.

## Hero da Home

### A. Foto em destaque ao lado do texto (recomendada)

Preservar o palco azul-marinho, a textura e os detalhes dourados. Texto e CTAs à esquerda; foto interna grande à direita, com enquadramento vertical e borda discreta. A órbita atual desce para uma área própria abaixo das duas colunas, dentro do hero. Preservar os medalhões, links e movimento moderado.

A foto real traz a sede para o primeiro plano e funciona bem em seu formato vertical. A marca dourada na parede e a mesa são os pontos de referência do corte. Evitar uma faixa panorâmica que elimine esses elementos. No celular: texto, CTAs, foto e órbita, nessa ordem; revisar a altura total para não distanciar demais Parceiros.

Vantagem: evolução direta do visual atual. Cuidado: controlar a altura da foto e da órbita para que o hero não fique excessivamente longo.

### B. Abertura editorial com fotografia maior

Fundo claro dos tokens, título azul-marinho e fotografia ocupando mais da metade da composição. A órbita fica abaixo em uma faixa azul-marinho de largura total, preservando seu desenho e sua função de acesso aos serviços. No celular, a faixa vem depois da foto.

Vantagem: a fotografia ganha mais protagonismo e a sala conversa com o fundo claro. Cuidado: muda mais a percepção da abertura atual e exige validar as transições com header e Parceiros.

## Hero de Consórcio em Cotar Agora

### A. Painel amplo antes dos cards (recomendada)

Depois do título Cotar Agora, inserir um painel azul-marinho de largura total do container. Texto e CTA dourado à esquerda; composição já existente de consórcio à direita, usando `src/assets/marketing/xik-hero-seguro-consorcios.webp`. A arte tem um documento central e círculos dourados com pessoas, imóvel e moedas; sua linguagem se relaciona com os medalhões da Home.

O CTA Simular consórcio abre o modal preparado na etapa 1. Os nove cards permanecem abaixo e mantêm suas ações para a Porto. No celular, texto e CTA vêm antes da arte; o destaque precisa ser reconhecível sem ocupar várias telas.

Vantagem: hierarquia inequívoca para consórcio, com assets e tokens existentes. Cuidado: manter o painel menor que o hero principal da Home e evitar excesso de efeitos dourados.

### B. Destaque editorial aberto

Manter o fundo claro da seção, com um título de consórcio em escala maior, texto breve, CTA azul-marinho e a mesma arte ao lado. Uma linha dourada delimita a transição para os nove cards. O destaque usa o espaço e a tipografia em vez de uma caixa escura.

Vantagem: leitura mais leve em uma Home longa. Cuidado: a hierarquia precisa continuar muito superior à de um décimo card e a arte escura precisa ter uma integração cuidadosa com o fundo claro.

## Recomendação inicial

Começar com Home A + Consórcio A. Os dois blocos compartilham azul-marinho e dourado, mas têm papéis diferentes: a foto real apresenta a Xik e o segundo bloco conduz à simulação. A grade de Parceiros entre os dois ajuda a separar os momentos. Esta é uma proposta para comparação, não uma escolha já aprovada.

## Prompt para Claude Design

Copiar o texto abaixo e fornecer as imagens citadas e capturas atuais da Home em desktop e celular. Os caminhos identificam os assets do projeto; o Claude Design precisa receber os arquivos para usá-los.

```text
Desenhe juntos dois blocos do site institucional da XIK Seguros: o hero principal da Home e um hero de Consórcio dentro da seção Cotar Agora, antes dos nove cards existentes. Entregue uma proposta visual coerente em desktop de 1440 px e celular de 390 px, com observações de adaptação para 360 px. Não implemente o site nem publique nada.

Use as capturas atuais como baseline. Preserve header, navegação, grade de Parceiros, cards, tipografia, componentes, espaçamento e linguagem visual do restante da página. Mostre os dois novos blocos no contexto da mesma Home, incluindo a transição com Parceiros. Não redesenhe outras seções.

Identidade existente:
- Manrope Variable.
- Azul primário #153358; fundo invertido #0b1e36; dourado #c8aa70; dourado claro #ddc79b.
- Fundo da página #fbfaf8; superfície #ffffff; superfície rebaixada #f3f1ec.
- Texto #14213a; texto secundário #5a6478; borda #e4e0d7.
- Cantos, sombras suaves, linhas douradas, texturas discretas e movimentos moderados conforme as referências atuais.
- Contraste legível, foco visível, alvos de toque confortáveis e versão com movimento reduzido.
- Sem travessão ou outro traço tipográfico longo nos textos.

Hero principal:
Use a versão fornecida de src/assets/marketing/xik-interna.webp. É a foto real vertical da sala de reunião com a marca XIK na parede. Não gere outra sede, não altere a marca e não substitua a foto por imagem de banco. Preserve a marca na parede e a mesa no enquadramento.
Explore primeiro uma composição com texto e CTAs à esquerda, foto grande à direita e o fundo azul-marinho atual. Faça a órbita existente dos serviços descer para uma área própria abaixo dessa composição. Preserve seus medalhões, links e acabamento; não a converta em uma lista genérica de ícones.
No celular, organize texto, CTAs, foto e órbita em uma sequência clara e sem overflow. Evite um hero tão alto que esconda por várias telas o restante da página.
CTA Faça sua cotação leva à seção Cotar Agora da Home. O secundário Conheça a Xik mantém seu destino atual. Use a copy atual como referência e identifique sugestões de nova copy como propostas para aprovação. Não invente números ou promessas.

Hero de Consórcio:
Fica DENTRO da seção Cotar Agora, abaixo do título e antes dos nove cards. Consórcio é o serviço de maior destaque dessa seção. Não é um décimo card igual aos outros.
Explore primeiro um painel amplo azul-marinho, texto à esquerda, CTA dourado Simular consórcio e a arte fornecida src/assets/marketing/xik-hero-seguro-consorcios.webp à direita. Relacione seu dourado e seus círculos à linguagem da órbita, sem competir com a fotografia do hero principal.
Use Consórcio Xik como título de trabalho e uma frase curta de convite à simulação, sem taxas, descontos, parcelas anunciadas, aprovação ou contemplação garantida.
O CTA abre o modal já preparado; não navega para a Porto. O modal contém Nome, Tipo de bem, Valor do crédito em faixas, Quanto cabe por mês e Pretende dar lance. Os três primeiros são obrigatórios; os dois últimos são opcionais. As opções estão em confirmação com a cliente. Não acrescente CPF, e-mail ou telefone. O botão Enviar pelo WhatsApp abre uma mensagem preenchida; não representa envio já concluído. O modal usa dialog nativo, foco inicial no nome, Esc, Fechar e retorno do foco ao CTA.

Preserve abaixo os nove cards na ordem atual: Equipamentos portáteis, Vida, Celular, Cartão Porto Bank, Conta Digital Porto Bank, Azul por Assinatura, Porto Serviços, Residencial e Automóvel. Todos abrem os links correspondentes da Porto em nova aba. Mantenha os links Saber mais.

Entregue a combinação principal descrita acima e uma comparação breve com estas alternativas: Home de fundo claro, fotografia maior e órbita em uma faixa azul inferior; Consórcio em composição editorial aberta no fundo claro, com tipografia maior e linha dourada antes dos cards. Explique o corte da foto, a hierarquia dos CTAs e a ordem mobile. Não altere Sinistro e Cobrança, biosite ou outras áreas fora desses dois blocos.
```
