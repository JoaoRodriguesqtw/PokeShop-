const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarPreco(valor) {
  return moeda.format(valor);
}

export function formatarData(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

// "mr-mime" -> "Mr Mime"
export function formatarNome(nome) {
  return nome
    .split("-")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

export function calcularTotal(itens) {
  return itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}

export function contarUnidades(itens) {
  return itens.reduce((soma, item) => soma + item.quantidade, 0);
}

//  máscaras do formulário de pagamento 
export function soDigitos(texto) {
  return texto.replace(/\D/g, "");
}

export function mascararCartao(texto) {
  return soDigitos(texto)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function mascararValidade(texto) {
  const digitos = soDigitos(texto).slice(0, 4);
  return digitos.length > 2
    ? `${digitos.slice(0, 2)}/${digitos.slice(2)}`
    : digitos;
}