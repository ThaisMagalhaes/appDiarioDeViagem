export type FormNavigationProps = {
  id?: string;
};

export type EditarNavigationProps = {
  dados: {};
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Form: FormNavigationProps;
      Editar: EditarNavigationProps;
    }
  }
}