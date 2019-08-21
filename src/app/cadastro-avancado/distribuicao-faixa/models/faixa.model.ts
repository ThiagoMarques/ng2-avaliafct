export class Faixa {

    id_faixa: number;
    limite_inferior: string;
    limite_superior: number;
    pontuacao_referencia: string;
    qtde_pessoas: string;
    valor_rateio_pessoa: string;
    percentual: string;
    TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe: number;
    TB_DISTRIBUICAO_id_distribuicao: number;

    constructor(
            limite_inferior: string,
            limite_superior: number,
            pontuacao_referencia: string,
            qtde_pessoas: string,
            valor_rateio_pessoa: string,
            percentual: string,
            TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe: number,
            TB_DISTRIBUICAO_id_distribuicao: number
        ) {
            this.limite_inferior = limite_inferior;
            this.limite_superior = limite_superior;
            this.pontuacao_referencia = pontuacao_referencia;
            this.qtde_pessoas = qtde_pessoas;
            this.valor_rateio_pessoa = valor_rateio_pessoa;
            this.percentual = percentual;
            this.TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe = TB_REFERENCIA_FCT_GFE_id_referencia_fct_gfe,
            this.TB_DISTRIBUICAO_id_distribuicao = TB_DISTRIBUICAO_id_distribuicao;
        }
}
