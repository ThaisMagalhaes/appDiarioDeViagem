export type FormNavigationProps = {
  id?: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CadastrarViagemForm: FormNavigationProps;
      AlterarViagemForm: FormNavigationProps;
      ConsultarViagemForm: FormNavigationProps;
      CadastrarEntrada: FormNavigationProps;
      ConsultarEntrada: FormNavigationProps;
      AlterarEntrada: FormNavigationProps;
    }
  }
}
